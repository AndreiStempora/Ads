import "./ticker.scss";
import {useEffect, useRef, useState} from "react";
import useApi from "../../api/api"
import {useTime, useTickerCssAnimation, useTickerJsAnimation} from "../../hooks/tickerHook";

export const TickerComponent = () => {
    const {hours, minutes} = useTime();
    const { container } = useTickerJsAnimation();
    // const { container: container2 } = useTickerCssAnimation();
    
    
    return (
        <div className={"overlay23"}>
            <div className="ticker">
                <div className="clock">
                    <span className="clock__hours">{hours}</span>:
                    <span className="clock__minutes">{minutes}</span>
                </div>
                <div ref={container} className="ticker-container">
                </div>
            </div>
            {/*<div className="ticker2">*/}
            {/*    <div className="clock">*/}
            {/*        <span className="clock__hours">{hours}</span>:*/}
            {/*        <span className="clock__minutes">{minutes}</span>*/}
            {/*    </div>*/}
            {/*    <div ref={container2} className="ticker-container">*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}