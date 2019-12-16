import React, { useState, useRef } from "react";
import "./App.css";
import videojs from "video.js";

function App() {
  let player;

  const [loaded, setLoad] = useState(false);
  const inputRef = useRef();
  const onSelect = () => {
    setLoad(true);
    const videoJsOptions = {
      width: document.body.offsetWidth,
      height: document.body.offsetHeight,
      autoplay: true,
      controls: true,
      liveui: true,
      sources: [
        {
          src: inputRef.current ? inputRef.current.value : "",
          type: "application/x-mpegURL"
        }
      ]
    };

    player = videojs(document.querySelector("video"), videoJsOptions, () => {
      console.log("OnPlayer Ready");
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  };

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
      />
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
      <link
        href="https://vjs.zencdn.net/7.4.1/video-js.css" // FIXME cdnで良いのかどうかは検討する
        rel="stylesheet"
      ></link>
      <header className="App-header">
        {loaded ? null : (
          <div>
            <h1>HLS動画プレイヤー</h1>
            <br />
            <h5>m3u8ファイルのURLを入力してください</h5>
            <input style={style.enter} type="text" ref={inputRef} />
            <button style={style.enter} onClick={onSelect}>
              読み込み
            </button>
          </div>
        )}

        <div style={loaded ? {} : style.hidden} data-vjs-player>
          <video id="video" className="video-js"></video>
        </div>
      </header>
    </div>
  );
}

const style = {
  hidden: {
    display: "none"
  },
  enter: {
    backgroundColor: "#1234",
    paddingLeft: "10px"
  }
};

export default App;
