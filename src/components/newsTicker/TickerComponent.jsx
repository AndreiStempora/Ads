import "./ticker.scss";
import {useEffect, useRef} from "react";
import useApi from "../../api/api"
import Marquee from "react-fast-marquee";

export const TickerComponent = () => {
    const {getNewsTicker} = useApi();
    const newsRef = useRef();
    let newArray = ['red-------------------------','red++++++++++++++++++++++++','red????????????????????????'];
    useEffect(() => {
        (async () => {
            const news = await getNewsTicker();
            newsRef.current = news.ads;
            console.log(newsRef.current);
            let y=[];
             news.ads.map(a => y.push(a.text))
                let x = document.querySelector('.ticker-container').setAttribute('array',y)
                console.log(x,y)
                
            
            
            // newsRef.current.push()
            // newsRef.current.push()
            // newsRef.current.push('red????????????????????????')
        })()
    }, [])

    return (
        <div className="ticker-container">
            <Marquee 
                play={true}
                direction="left"
                speed={30}
                delay={2}
                loop={0}
                gradient={false}
            >
                {newArray?.map((news,i) => {
                    return (<h1 key={i}>{news}</h1>)
                })}
            </Marquee>
            <div className={"x"}>aaaaaaaaaaaaaaaaaaaaaaaaa</div>
        </div>
    )
}