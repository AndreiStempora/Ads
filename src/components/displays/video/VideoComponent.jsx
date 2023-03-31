import ReactPlayer from "react-player";
export const VideoComponent = ({data}) => {
    // console.log(data, "data")
    return (
        <ReactPlayer
            url={'https://v2.stemads.stempora.me/public/stemads/emanuel/4.mp4?1637754027'}
            width = "100%"
            height = "100%"
            controls = {false}
            playing = {true}
            muted = {false}
            loop = {false}
            volume = {0.5}
            playbackRate = {1}
            pip = {false}
            light = {false}
        />
    )
}