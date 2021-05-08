import React, {useState, useRef, useEffect} from "react";
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
export default function MultiStepForm(props) {
    let pages = props.children.length==null?[props.children]:props.children;
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    let currentPage = pages[currentPageIndex];
    let previousPage = pages[currentPageIndex-1];
    let loadNextPage = ()=>{
        setCurrentPageIndex(currentPageIndex+1);
        console.log(currentPage);
    };
    const CurrentFormPageWrapper = styled.div`
        background-color: rgb(39, 39, 39);
        padding: 20px;
        border-radius: 20px;
        width: 100vw;
        height: 300px;
        margin-left: 20px;
        margin-right: 20px;
    `;
    const PreviousFormPageWrapper = styled.div`
        background-color: rgb(39, 39, 39);
        padding: 20px;
        margin-left: 20px;
        margin-right: 20px;
        border-radius: 20px;
        width: 100vw;
        height: 300px;
    `;

    const MultiStepFormWrapper = styled.div`
        display: flex;
        flexDirection: row;
        position: fixed;
        bottom: 100px;
        width: 200vw;
        transform: translateX(-100vw);
        animation: swipeLeft 0.5s;
        @keyframes swipeLeft {
            from { transform: translateX(0vw); }
            to   { transform: translateX(-100vw); }
        }
    `;
    
    return(
    <MultiStepFormWrapper style={currentPageIndex==0?{animation: "swipeLeft 0s", transform: "translateX(-100vw)"}:{}}>
        <PreviousFormPageWrapper>
            {previousPage}
            {currentPageIndex>=pages.length-1?
                <button type="submit" onClick={props.onSubmit}>Submit</button>:
                <button type="button" onClick={()=>{loadNextPage()}}>next</button>
            }
        </PreviousFormPageWrapper>

        <CurrentFormPageWrapper>
            {currentPage}
            {currentPageIndex>=pages.length-1?
                <button type="submit" onClick={props.onSubmit}>Submit</button>:
                <button type="button" onClick={()=>{loadNextPage()}}>next</button>
            }
        </CurrentFormPageWrapper>


    </MultiStepFormWrapper>
    );
}