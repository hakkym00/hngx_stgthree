import React, { useState, useRef, useEffect, useMemo } from "react";
import davido from "../assests/davido.jpeg";
import olamide from "../assests/olamide.webp";
import wizkid from "../assests/wizkid.jpeg";
import burna from "../assests/burna.jpg";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Searchbg from "../assests/search.jpg";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "react-loading-skeleton/dist/skeleton.css";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";

function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [search, setSearch] = useState("");
  // const imagesArray = [
  //   {
  //     image: davido,
  //     tag: "davido",
  //   },
  //   {
  //     image: wizkid,
  //     tag: "wizkid",
  //   },
  //   {
  //     image: burna,
  //     tag: "burna",
  //   },
  //   {
  //     image: olamide,
  //     tag: "olamide",
  //   },
  // ];
  const imagesArray = useMemo(
    () => [
      {
        image: davido,
        tag: "davido",
      },
      {
        image: wizkid,
        tag: "wizkid",
      },
      {
        image: burna,
        tag: "burna",
      },
      {
        image: olamide,
        tag: "olamide",
      },
    ],
    []
  );

  const [imageGallery, setImageGallery] = useState(imagesArray);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
        setIsLoggedIn(true);
      } else {
        navigate("/login");
      }
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      listen();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!search) {
      setImageGallery(imagesArray);
    }
  }, [imagesArray, search]);

  const handleSignout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout Successfully");
      setIsLoggedIn(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoggedIn(false);
    }
  };

  //save reference for dragItem and dragOverItem
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  //const handle drag sorting
  const handleSort = () => {
    //duplicate items
    let _imageGallery = [...imageGallery];
    console.log(dragItem.current);

    //remove and save the dragged item content
    const draggedItemContent = _imageGallery.splice(dragItem.current, 1)[0];

    //switch the position
    _imageGallery.splice(dragOverItem.current, 0, draggedItemContent);

    console.log(dragItem.current);
    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setImageGallery(_imageGallery);

    // isLoggedIn && toast.success("Sorted successfully");
  };

  const handleSearch = () => {
    console.log(imageGallery);
    setLoading(true);
    const searchedTag = imageGallery.filter((artist) => {
      return search.toLocaleLowerCase() === artist.tag;
    });
    if (searchedTag.length === 0) {
      setLoading(false);
      // setErrorMsg("Images not found ");
      toast.error("Images not found");
      setImageGallery(imagesArray);
    } else {
      setLoading(false);
      setImageGallery(searchedTag);
      setErrorMsg("");
    }
  };

  const handleSearchOnchange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="homepage">
      <div className="header">
        <Link to="/">
          <p>
            <i className=" fa fa-film fa-2x"></i>
            <span className="header_title"> Gallery </span>
          </p>
        </Link>

        {isLoggedIn ? (
          <p onClick={handleSignout} className="logout">
            Logout
          </p>
        ) : (
          <Link className="button" to="/login">
            <p>Login</p>
          </Link>
        )}
      </div>
      <div
        className="search"
        style={{
          backgroundImage: `url(${Searchbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="searchBar">
          <input
            type="text"
            placeholder="search"
            value={search}
            onChange={(e) => handleSearchOnchange(e)}
          />
          <div onClick={handleSearch}>
            <i className=" fa fa-search fa-1x"></i>
          </div>
        </div>
      </div>
      <div className="image_gallery">
        <h2>Image Gallery</h2>
        {loading ? (
          <LoadingBox />
        ) : errorMsg ? (
          <MessageBox> {errorMsg} </MessageBox>
        ) : (
          <div className="image_container">
            {imageGallery.map((image, index) => (
              <div
                key={index}
                className="image"
                draggable
                onDragStart={(e) =>
                  isLoggedIn
                    ? (dragItem.current = index)
                    : toast.error("Login to sort images")
                }
                onDragEnter={(e) =>
                  isLoggedIn && (dragOverItem.current = index)
                }
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
              >
                <img src={image.image} alt={image.tag} />
                <p className="imageTag"> {image.tag} </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  );
}

export default Homepage;
