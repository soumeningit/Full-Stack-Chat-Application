import React from "react";
import { useNavigate } from "react-router-dom";
import image0 from "../assets/images/Image0.svg";
import image1 from "../assets/images/Image1.svg";
import image2 from "../assets/images/Image2.svg";
import section1Image from "../assets/images/section1Image.svg";
import section2Image from "../assets/images/section2Image.svg";
import section3Image from "../assets/images/section3Image.svg";
import section4Image from "../assets/images/section4Image.svg";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  function clickHandle(event) {
    event.preventDefault();
    if (!token) {
      navigate("/login");
    } else {
      navigate("/chat");
    }
  }

  return (
    <>
      <div id="wrapper" class="overflow-x-hidden">
        {/* <!-- Navigation bar --> */}
        <section class="bg-[#505cdbd0] font-['ggSans']">
          <nav class="max-w-[1200px] mx-auto flex flex-row h-[72px] items-center">
            {/* <!-- Logo --> */}
            <div>
              <img src="./images/logo.svg" alt="" />
            </div>

            <div className="flex flex-row-reverse">
              <button
                onClick={() => navigate("/signup")}
                className="text-black py-[7px] px-[16px] text-sm inline-flex font-['ggSans'] text-[16px] font-[500] border-none rounded-full bg-white leading-6 hover:text-[#404EED] hover:shadow-2xl shadow-[#404EED] transition-all duratio-200 ease-in-out"
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/login")}
                className="text-black py-[7px] px-[16px] text-sm inline-flex font-['ggSans'] text-[16px] font-[500] border-none rounded-full bg-white leading-6 hover:text-[#404EED] hover:shadow-2xl shadow-[#404EED] transition-all duratio-200 ease-in-out"
              >
                Log In
              </button>
            </div>
          </nav>
        </section>

        {/* <!-- Hero Section --> */}
        <section class="-mt-1 bg-[#7988f7] relative w-full">
          <img src={image0} loading="lazy" class="absolute w-full bottom-0" />
          <img
            src={image1}
            alt=""
            loading="lazy"
            class="absolute -right-[14%] bottom-0"
          />
          <img
            src={image2}
            alt=""
            loading="lazy"
            class="absolute -left-[14%] bottom-0"
          />
          <div class="max-w-[1200px] min-h-[620px] relative mx-auto flex flex-col align-middle pt-[50px] pb-[50px] text-left space-y-4 items-center justify-center">
            <h1 class="font-['GintoNord'] text-white text-[60px] font-extrabold leading-[95%] px-[25px] py-[25px] text-left items-center">
              IMAGINE A PLACE
            </h1>
            <p class="text-white font-['ggSans'] text-[20px] font-[400] max-w-[65%] text-left leading-10 mb-[10px]">
              ...where you can belong to a school club, a gaming group, or a
              worldwide art community. Where just you and a handful of friends
              can spend time together. A place that makes it easy to talk every
              day and hang out more often.
            </p>
            <button onClick={clickHandle}>
              <div className="inline-flex items-center gap-3 bg-blue-700 text-white font-semibold py-3 px-6 pl-5 rounded-full overflow-hidden whitespace-nowrap transition-colors duration-300 hover:bg-black">
                <span className="relative flex-shrink-0 w-6 h-6 bg-white text-purple-700 rounded-full grid place-items-center overflow-hidden">
                  <svg
                    className="w-2.5 h-2.5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 15"
                  >
                    <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" />
                  </svg>
                  <svg
                    className="w-2.5 h-2.5 fill-current absolute transform translate-x-[-150%] translate-y-[150%] transition-transform duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 15"
                  >
                    <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" />
                  </svg>
                </span>
                Go To Chat
              </div>
            </button>
          </div>
        </section>

        {/* <!-- Section-1 --> */}
        <section class="mt-[100px]">
          <div class="w-10/12 max-w-[1200px] mx-auto flex flex-row justify-between items-center">
            {/* <!-- Left Section --> */}
            <div class="w-full h-full p-4">
              <img src={section1Image} alt="" />
            </div>
            {/* <!-- Right Section --> */}
            <div class="w-[85%] h-full mx-14 space-y-6">
              <h1 class="font-['ggSans'] text-black font-extrabold text-[48px] leading-[120%]">
                Create an invite-only place where you belong
              </h1>
              <p class="font-['ggSans'] text-black font-[400] text-[25px] mt-[24px] opacity-85">
                Discord servers are organized into topic-based channels where
                you can collaborate, share, and just talk about your day without
                clogging up a group chat.
              </p>
            </div>
          </div>
        </section>

        {/* <!-- Section-2 --> */}
        <section class="bg-[#f6f6f6] mt-[100px]">
          <div class="w-full max-w-[1200px] mt-[24px] mx-auto flex flex-row justify-between items-center">
            {/* <!-- Left Part --> */}
            <div class="h-full max-w-[45%] mt-[24px]">
              <h1 class="font-['ggSans'] text-black font-extrabold text-[48px] leading-[120%] max-w-[80%]">
                Where hanging out is easy
              </h1>
              <p class="font-['ggSans'] text-black leading-10 font-[400] text-[25px] mt-[24px] max-w-[85%] opacity-80">
                Grab a seat in a voice channel when you’re free. Friends in your
                server can see you’re around and instantly pop in to talk
                without having to call.
              </p>
            </div>
            {/* <!-- Right Part --> */}
            <div class="w-[50%] mt-[56px]">
              <img src={section2Image} alt="" />
            </div>
          </div>
        </section>

        {/* <!-- Section-3 --> */}
        <section class="mt-[100px] space-x-12">
          <div class="w-10/12 max-w-[1200px] mx-auto flex flex-row items-center justify-between">
            {/* <!-- Left Part --> */}
            <div class="h-full w-[50%]">
              <img src={section3Image} alt="" />
            </div>
            {/* <!-- Right Part --> */}
            <div class="w-[45%] ml-[56px] px-10">
              <h1 class="font-['ggSans'] text-black font-extrabold text-[48px] leading-[120%]">
                From few to a fandom
              </h1>
              <p class="font-['ggSans'] text-black font-[400] text-[25px] mt-[24px] opacity-85">
                Get any community running with moderation tools and custom
                member access. Give members special powers, set up private
                channels, and more.
              </p>
            </div>
          </div>
        </section>

        {/* <!-- Section-4 --> */}
        <section class="mt-[100px] bg-[#f6f6f6]">
          <div class="w-10/12 max-w-[1200px] mx-auto flex-col justify-between items-center align-middle py-14 space-y-7">
            {/* <!-- Upper Part --> */}
            <div class="mt-[56px]">
              <h1 class="font-['GintoNord'] font-[800] leading-[20px] text-[48px] py-5 px-8">
                RELIABLE TECH FOR STAYING CLOSE
              </h1>
              <p class="text-[21px] leading-[35px] mt-[15px] opacity-85 py-2 px-8">
                Low-latency voice and video feels like you’re in the same room.
                Wave hello over video, watch friends stream their <br />
                <span class="ml-[210px]">
                  games, or gather up and have a drawing session with screen
                  share.
                </span>
              </p>
            </div>

            {/* <!-- Lower Part --> */}
            <div class="w-full">
              <img
                src={section4Image}
                alt=""
                loading="lazy"
                class="w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* <!-- Section-5 --> */}
        <section class="mx-[100px]">
          <div class="w-10/12 max-w-[1200px] mx-auto relative flex flex-col items-center align-center py-14 px-7 space-y-10">
            <div class="relative">
              <h1 class="text-[32px] font-['ggSans'] font-[700] px-7">
                Ready to start your journey?
              </h1>
              <button
                onClick={() => navigate("/login")}
                className="text-white bg-amber-200 mx-auto translate-x-44 py-[7px] px-[16px] text-sm inline-flex font-['ggSans'] text-[16px] font-[500] border-none rounded-full leading-6 hover:text-[#404EED] hover:shadow-2xl shadow-[#404EED] transition-all duratio-200 ease-in-out"
              >
                Explore
              </button>
            </div>
          </div>
        </section>
      </div>
      {/* <!-- Footer --> */}
      <footer class="bg-zinc-800 mt-[100px]">
        <div class="w-10/12 max-w-[1200px] relative mx-auto flex py-12 px-7 space-y-9">
          {/* <!-- Left Part --> */}
          <div class="flex flex-col w-[35%] space-x-5 mt-[56px]">
            <div class="inline-flex align-middle items-center font-['ggSans'] text-white text-[15px] max-w-[150px] justify-evenly">
              <img src="./images/us.svg" alt="" class="h-4 w-11" /> English, USA
              <svg
                class="w-2 h-2 text-[#fff] dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 8"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                />
              </svg>
            </div>
            <div class="flex flex-row space-x-4 justify-evenly py-11 text-left max-w-[200px]">
              {/* <!-- Twitter --> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-[#fff] dark:text-white"
                aria-hidden="true"
                fill="#fff"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
              {/* <!-- Instagram --> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="#fff"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              {/* <!-- Facebook --> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="#fff"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
              {/* <!-- Youtube --> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-8"
                fill="#fff"
                viewBox="0 0 24 24"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              {/* <!-- TikTok --> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="h-5 w-5"
              >
                {/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                <path
                  fill="#fff"
                  d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
                />
              </svg>
            </div>
          </div>

          {/* <!-- Right part --> */}
          <div class="grid grid-cols-4 justify-between text-[#fff] font-['ggSans']">
            {/* <!-- Box-1 --> */}
            <div class="">
              <h2 class="text-[#404EED] py-4 text-[18px] leading-[16px] font-[250px]">
                Product
              </h2>
              <ul class="text-white text-[16px] space-y-4 mt-[16px]">
                <li>
                  <a href="#">Download</a>
                </li>
                <li>
                  <a href="#">Nitro</a>
                </li>
                <li>
                  <a href="#">Status</a>
                </li>
                <li>
                  <a href="#">App Directory</a>
                </li>
              </ul>
            </div>

            {/* <!-- Box-2 --> */}
            <div>
              <ul class="space-y-4">
                <h2 class="text-[#404EED] py-4 text-[18px] leading-[16px] font-[250px]">
                  Company
                </h2>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Jobs</a>
                </li>
                <li>
                  <a href="#">Brand</a>
                </li>
                <li>
                  <a href="#">Newsroom</a>
                </li>
                <li>
                  <a href="#">Fall Release</a>
                </li>
              </ul>
            </div>

            {/* <!-- Box-3 --> */}
            <div>
              <ul class="space-y-4">
                <h2 class="text-[#404EED] py-4 text-[18px] leading-[16px] font-[250px]">
                  Resources
                </h2>
                <li>
                  <a href="#"> College</a>
                </li>
                <li>
                  <a href="#"> Support</a>
                </li>
                <li>
                  <a href="#"> Safety</a>
                </li>
                <li>
                  <a href="#"> Blog</a>
                </li>
                <li>
                  <a href="#"> Feedback</a>
                </li>
                <li>
                  <a href="#"> StreamKit</a>
                </li>
                <li>
                  <a href="#"> Creators</a>
                </li>
                <li>
                  <a href="#"> Community</a>
                </li>
                <li>
                  <a href="#"> Developers</a>
                </li>
                <li>
                  <a href="#"> Gaming</a>
                </li>
                <li>
                  <a href="#"> Official 3rd Party Merch</a>
                </li>
              </ul>
            </div>

            {/* <!-- Box-4 --> */}
            <div>
              <ul class="space-y-4">
                <h2 class="text-[#404EED] py-4 text-[18px] leading-[16px] font-[250px]">
                  Policies
                </h2>
                <li>
                  <a href="#"> Terms</a>
                </li>
                <li>
                  <a href="#"> Privacy</a>
                </li>
                <li>
                  <a href="#"> Cookie Settings</a>
                </li>
                <li>
                  <a href="#"> Guidelines</a>
                </li>
                <li>
                  <a href="#"> Acknowledgements</a>
                </li>
                <li>
                  <a href="#"> Licenses</a>
                </li>
                <li>
                  <a href="#"> Company Information</a>
                </li>
              </ul>
            </div>
          </div>
          <span class="absolute bottom-[4px] w-full h-[0.1rem] bg-[#5865f2]"></span>
        </div>
        <div class="max-w-[1200px] mx-auto flex mt-[16px] flex-row-reverse items-center pl-8 py-8">
          <img src="./images/logo.svg" alt="" />
          <button
            class="text-[#fff] bg-blue-400 py-[7px] px-[16px] text-sm inline-flex font-['ggSans'] text-[16px] font-[500] border-none rounded-full leading-6 hover:text-[#404EED] hover:shadow-2xl shadow-[#404EED] transition-all duratio-200 ease-in-out"
            onClick={() => navigate("/signup")}
          >
            SignUP
          </button>
          <button
            class="text-[#fff] bg-blue-400 py-[7px] px-[16px] text-sm inline-flex font-['ggSans'] text-[16px] font-[500] border-none rounded-full leading-6 hover:text-[#404EED] hover:shadow-2xl shadow-[#404EED] transition-all duratio-200 ease-in-out"
            onClick={() => navigate("/chat/contact-us")}
          >
            ContactUs
          </button>
        </div>
      </footer>
    </>
  );
}

export default Home;
