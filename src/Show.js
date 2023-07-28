import { months } from "moment/moment";
import React from "react";
import { useState } from "react";
import apikeys from "./apikeys";
import back from "./images/background.jpg";
import back1 from "./images/background1.jpg";
import Clk from "./Clk";

import "./index.css";

function Show() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  function dateBuilder(d) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return day + "," + date + " " + month + " " + year;
  }

  const search = () => {
    fetch(`${apikeys.base}weather?q=${query}&appid=${apikeys.key}&units=metric`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });
  };
  function temperature(weather) {
    let temp = weather.main.temp;
    let tempmax = weather.main.temp_max;
    let tempmin = weather.main.temp_min;
    let humidity = weather.main.humidity;

    return (
      <>
        <div className="font-bold text-3xl">{temp}°C</div>
        <div className="font-normal text-xl">
          {tempmax}|{tempmin}
        </div>

        <div className="font-s">Humidity:{humidity}</div>
      </>
    );
  }
  function nam(weather) {
    let name = weather.name;
    return name;
  }

  return (
    <div>
      <div>
        <div className=" h-screen  w-auto p-10  bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl shadow-slate-600 hover:border-zinc-950 hover: border-solid hover:border-2  ">
          <div className="bg-slate-600 text-2xl text-white w-96 mx-auto ">
            <h1>Weather Application</h1>
          </div>

          <div className="flex ">
            <div>
              <img
                src={back}
                width="500px"
                height="500px"
                alt="bg"
                className="rounded-2xl"
                id="i1"
              ></img>
            </div>
            <div className="ml-18 mt-10 ">
              <p className="text-xl ml-2 mb-2 font-serif">
                You can see the weather of any Location by enter the location{" "}
                <br></br>in the box and click on search button.
              </p>
              <input
                type="text"
                placeholder="Search Your Location"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                className="p-1 border-2 border-black focus:outline-none focus:ring focus:ring-violet-300 rounded-xl"
              />
              <button
                onClick={search}
                className="border-2 border-black bg-gradient-to-r from-violet-500 to-fuchsia-500 p-1  w-40 ml-10 "
              >
                Search
              </button>
              <div className="font-serif text-center text-3xl mx-auto mt-20 shadow-2xl shadow-slate-900 hover:border-zinc-950 hover: border-solid hover:border-2 w-48 bg-white">
                {nam(weather)}
              </div>
            </div>
          </div>

          <div className="flex ">
            <div className=" m-0 shadow-2xl shadow-slate-900 hover:border-zinc-950 hover: border-solid hover:border-2 w-50 mx-auto p-4 bg-white">
              <div className="font-semibold text-xl font-sans">
                <Clk />
              </div>
              <div className="mt-2 font-bold font-serif">
                {dateBuilder(new Date())}
              </div>
            </div>
            <div>
              {typeof weather.main != "undefined" ? (
                <>
                  <div className="shadow-2xl shadow-slate-900 hover:border-zinc-950 hover: border-solid hover:border-2 w-48 mx-auto mt-8 p-4 bg-white">
                    {temperature(weather)}
                  </div>
                </>
              ) : (
                " "
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Show;
