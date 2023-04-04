import useApi from "../api/api";
import {useEffect, useRef, useState} from "react";

export const useTickerCssAnimation = () => {
    const {getNewsTicker} = useApi();
    const newsRef = useRef();
    const container = useRef();
    const SPEED = 50;
    let wrapperTimeout;
    let styleTimeout;
    let animateTimeout;
    let index = 0;
    
    
    useEffect(() => {
        (async () => {
            const news = await getNewsTicker();
            if(news?.ads?.length !== 0){
                newsRef.current = news;
                const setArray = news?.ads?.map((ad) => {
                    return ad.text;
                })
                container.current.setAttribute('texts', JSON.stringify(setArray));
                animate();
            }
        })()
        
        return () => {
            clearInterval(animateTimeout);
            clearTimeout(wrapperTimeout);
            clearTimeout(styleTimeout);
            container.current.querySelectorAll('.wrapper').forEach((item) => {
                item.remove();
            });
        }
    }, [])
    
    function widthAll() {
        let textComponent = container.current.querySelectorAll('.paragraph');
        let lastText = textComponent[textComponent.length - 1];
        let widthText = lastText.offsetWidth;
        let wrapperComponent = container.current.querySelectorAll('.wrapper');
        let lastWrapper = wrapperComponent[wrapperComponent.length - 1];
        let widthWrapper = lastWrapper.offsetWidth;
        let timeText = (widthText / SPEED) * 1000 + 'ms'; // * 1000 = transform in ms
        // let timeText = (widthText / SPEED) * 1000; // * 1000 = transform in ms
        let timeWrapper = (widthWrapper / SPEED) * 1000 + 'ms';
        // let timeWrapper = (widthWrapper / SPEED) * 1000;
        let timeoutText = (widthText / SPEED) * 1000;
        let timeoutWrapper = (widthWrapper / SPEED) * 1000;
        return {
            timeText: timeText,
            timeWrapper: timeWrapper,
            timeoutText: timeoutText,
            lastText: lastText,
            lastWrapper: lastWrapper,
            timeoutWrapper: timeoutWrapper,
            widthText: widthText,
            widthWrapper: widthWrapper
        }
    }
    
    function createElement(string) {
        const wrapper = document.createElement("div");
        const newText = document.createElement("p");
        wrapper.classList.add("wrapper")
        newText.classList.add("paragraph")
        wrapper.appendChild(newText);
        newText.innerHTML = string;
        container.current.appendChild(wrapper);
    }
    
    function selectNextString() {
        const aux = JSON.parse(container.current.getAttribute('texts'));
        // console.log(aux)
        if (aux[index] === undefined) {
            index = 0
        }
        return aux[index];
    }
    
    function moveText(lastText, timeText) {
        lastText.style.transform = 'translateX(0)';
        lastText.style.transitionDuration = timeText;
    };
    //
    function moveWrapper(lastWrapper, timeWrapper, timeoutText, timeoutWrapper) {
        wrapperTimeout = setTimeout(() => {
            lastWrapper.classList.add("canDelete");
        }, timeoutText + timeoutWrapper)
        styleTimeout = setTimeout(() => {
            lastWrapper.style.transform = 'translateX(-100%)';
            lastWrapper.style.transitionDuration = timeWrapper;
        }, timeoutText)
    };
    // function moveText2(lastText, timeText,widthText) {
    //     let previousTimeStamp;
    //     let start;
    //     let done;
    //
    //
    //     function step(timestamp) {
    //         if (start === undefined) {
    //             start = timestamp;
    //         }
    //         const elapsed = timestamp - start;
    //
    //         if (previousTimeStamp !== timestamp) {
    //             // Math.min() is used here to make sure the element stops at exactly 200px
    //             const count = widthText - Math.min(0.05 * elapsed, widthText );
    //             lastText.style.transform = `translateX(${count}px)`;
    //             if (count === 0) done = true;
    //         }
    //
    //         if (elapsed < timeText) {
    //             // Stop the animation after 2 seconds
    //             previousTimeStamp = timestamp;
    //             if (!done) {
    //                 window.requestAnimationFrame(step);
    //             }
    //         }
    //     }
    //     window.requestAnimationFrame(step);
    // };
    
    // function moveWrapper2(lastWrapper, timeWrapper, timeoutText, timeoutWrapper, widthWrapper) {
    //     wrapperTimeout = setTimeout(() => {
    //         lastWrapper.classList.add("canDelete");
    //     }, timeoutText + timeoutWrapper);
    //     let previousTimeStamp;
    //     let start;
    //     let done;
    //
    //
    //     function step(timestamp) {
    //         if (start === undefined) {
    //             start = timestamp;
    //         }
    //         const elapsed = timestamp - start;
    //
    //         if (previousTimeStamp !== timestamp) {
    //             // Math.min() is used here to make sure the element stops at exactly 200px
    //             const count = - Math.min(0.05 * elapsed, widthWrapper );
    //             // console.log(count, "count", widthWrapper, "widthWrapper", elapsed, "elapsed")
    //             lastWrapper.style.transform = `translateX(${count}px)`;
    //             if (count === widthWrapper) done = true;
    //         }
    //
    //         if (elapsed < timeoutWrapper) {
    //             // Stop the animation after 2 seconds
    //             previousTimeStamp = timestamp;
    //             if (!done) {
    //                 window.requestAnimationFrame(step);
    //             }
    //         }
    //     }
    //     styleTimeout = setTimeout(() => {
    //         window.requestAnimationFrame(step);
    //         // lastWrapper.style.transform = 'translateX(-100%)';
    //         // lastWrapper.style.transitionDuration = timeWrapper;
    //     }, timeoutText)
    // };
    
    function animate() {
        let str = selectNextString();
        createElement(str);
        index++;
        const {timeText, timeWrapper, timeoutText, lastText, lastWrapper, timeoutWrapper, widthText, widthWrapper} = widthAll();
        // console.log(lastText)
        moveText(lastText, timeText, widthText);
        moveWrapper(lastWrapper, timeWrapper, timeoutText, timeoutWrapper, widthWrapper);
        animateTimeout = setTimeout(() => {
            animate();
        }, timeoutText + 2000)
    }
    
    return {container}
    
}

export const useTickerJsAnimation = () => {
    const {getNewsTicker} = useApi();
    const newsRef = useRef();
    const container = useRef();
    const SPEED = 50;
    // let interval;
    let wrapperTimeout;
    let styleTimeout;
    let animateTimeout;
    // let clockInterval;
    let index = 0;
    
    
    useEffect(() => {
        (async () => {
            // setInterval(async () => {
            const news = await getNewsTicker();
            if(news?.ads?.length !== 0){
                newsRef.current = news;
                const setArray = news?.ads?.map((ad) => {
                    return ad.text;
                })
                container.current.setAttribute('texts', JSON.stringify(setArray));
                animate();
            }
        })()
        return () => {
            clearInterval(animateTimeout);
            clearTimeout(wrapperTimeout);
            clearTimeout(styleTimeout);
            container.current.querySelectorAll('.wrapper').forEach((item) => {
                item.remove();
            });
        }
    }, [])
    
    function widthAll() {
        let textComponent = container.current.querySelectorAll('.paragraph');
        let lastText = textComponent[textComponent.length - 1];
        let widthText = lastText.offsetWidth;
        let wrapperComponent = container.current.querySelectorAll('.wrapper');
        let lastWrapper = wrapperComponent[wrapperComponent.length - 1];
        let widthWrapper = lastWrapper.offsetWidth;
        
        let timeText = (widthText / SPEED) * 1000; // * 1000 = transform in ms
        
        let timeWrapper = (widthWrapper / SPEED) * 1000;
        let timeoutText = (widthText / SPEED) * 1000;
        let timeoutWrapper = (widthWrapper / SPEED) * 1000;
        return {
            timeText: timeText,
            timeWrapper: timeWrapper,
            timeoutText: timeoutText,
            lastText: lastText,
            lastWrapper: lastWrapper,
            timeoutWrapper: timeoutWrapper,
            widthText: widthText,
            widthWrapper: widthWrapper
        }
    }
    
    function createElement(string) {
        const wrapper = document.createElement("div");
        const newText = document.createElement("p");
        wrapper.classList.add("wrapper")
        newText.classList.add("paragraph")
        wrapper.appendChild(newText);
        newText.innerHTML = string;
        container.current.appendChild(wrapper);
    }
    
    function selectNextString() {
        const aux = JSON.parse(container.current.getAttribute('texts'));
        // console.log(aux)
        if (aux[index] === undefined) {
            index = 0
        }
        return aux[index];
    }

    function moveText2(lastText, timeText,widthText) {
        let previousTimeStamp;
        let start;
        let done;
        
        
        function step(timestamp) {
            if (start === undefined) {
                start = timestamp;
            }
            const elapsed = timestamp - start;
            
            if (previousTimeStamp !== timestamp) {
                // Math.min() is used here to make sure the element stops at exactly 200px
                const count = widthText - Math.min(0.05 * elapsed, widthText );
                lastText.style.transform = `translateX(${count}px)`;
                if (count === 0) done = true;
            }
            
            if (elapsed < timeText) {
                // Stop the animation after 2 seconds
                previousTimeStamp = timestamp;
                if (!done) {
                    window.requestAnimationFrame(step);
                }
            }
        }
        window.requestAnimationFrame(step);
    };
    
    function moveWrapper2(lastWrapper, timeWrapper, timeoutText, timeoutWrapper, widthWrapper) {
        wrapperTimeout = setTimeout(() => {
            lastWrapper.classList.add("canDelete");
        }, timeoutText + timeoutWrapper);
        let previousTimeStamp;
        let start;
        let done;
        
        
        function step(timestamp) {
            if (start === undefined) {
                start = timestamp;
            }
            const elapsed = timestamp - start;
            
            if (previousTimeStamp !== timestamp) {
                // Math.min() is used here to make sure the element stops at exactly 200px
                const count = - Math.min(0.05 * elapsed, widthWrapper );
                // console.log(count, "count", widthWrapper, "widthWrapper", elapsed, "elapsed")
                lastWrapper.style.transform = `translateX(${count}px)`;
                if (count === widthWrapper) done = true;
            }
            
            if (elapsed < timeoutWrapper) {
                // Stop the animation after 2 seconds
                previousTimeStamp = timestamp;
                if (!done) {
                    window.requestAnimationFrame(step);
                }
            }
        }
        styleTimeout = setTimeout(() => {
            window.requestAnimationFrame(step);
        }, timeoutText)
    };
    
    function animate() {
        let str = selectNextString();
        createElement(str);
        index++;
        const {timeText, timeWrapper, timeoutText, lastText, lastWrapper, timeoutWrapper, widthText, widthWrapper} = widthAll();
        // console.log(lastText)
        moveText2(lastText, timeText, widthText);
        moveWrapper2(lastWrapper, timeWrapper, timeoutText, timeoutWrapper, widthWrapper);
        animateTimeout = setTimeout(() => {
            animate();
        }, timeoutText + 2000)
    }
    return {container}
}

export const useTime = () =>{
    let clockInterval;
    let interval;
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    useEffect(() => {
        clockInterval = setInterval(() => {
            const date = new Date();
            setHours(date.getHours()>9?date.getHours():`0${date.getHours()}`);
            setMinutes(date.getMinutes() >9?date.getMinutes():`0${date.getMinutes()}`);
        }, 1000);
            interval = setInterval(() => {
                const deleteItem = document.querySelectorAll(".canDelete");
                deleteItem.forEach((item) => {
                    item.remove();
            })
        }, 30000);
            return () => {
                clearInterval(clockInterval);
                clearInterval(interval);
            }
    }, [])
    return {hours, minutes}
}