import React, {Fragment, useEffect, useState} from "react";
import projects from "../api/AllData.json";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Index = () =>{
    
    /*==============================================================*/

    var final_hex;

    function randomNumber(min, max) {  
        return Math.random() * (max - min) + min; 
    }

    function randombg(id){
        var a = randomNumber(100, 255);       //Red
        var b = randomNumber(100, 255);       //Green
        var c = randomNumber(100, 255);       //Blue
    
        var sum= a+b+c;
        var background="rgb("+ a + ", " + b + ", " + c + ")";
    
        if(sum>=455){
            var bglist = document.getElementById(id);
            bglist.style.color = ("#010101")
        }
        else{
            var bglist = document.getElementById(id);
            bglist.style.color = ("#fcfcfc")
        }
    
        var bglist = document.getElementById(id);
        bglist.style.backgroundColor = (background);
    }
    
    const rbcg = () => {
    
            let items = document.querySelectorAll(".itemPortrait");
            let iLen = items.length;
    
            for(let i=0; i<iLen-1; i++){
                var a = randomNumber(125, 255);       //Red
                var b = randomNumber(125, 255);       //Green
                var c = randomNumber(125, 255);       //Blue
            
                var sum= a+b+c;
                var bg="rgb("+ a + ", " + b + ", " + c + ")";
            
                if(sum>=455){
                    items[i].style.color = ("#010101")
                }
                else{
                    items[i].color = ("#fcfcfc")
                }
            
                items[i].style.backgroundColor = bg;
            }
    
      }
    
    /*==============================================================*/

    const [HFWidth, setHFWidth] = useState(0);

    const calcFrameWidth = () => {

        let landscapeItems = document.querySelectorAll(".itemLandscape");
        let landscapeWidth = landscapeItems.length*72;
        let portraitItems = document.querySelectorAll(".itemPortrait");
        let portraitWidth = portraitItems.length*36;

        /*
        for (var lsItems in projects){
            if (lsItems.class == "landscape"){
                landscapeWidth +=72
            }
            else{
                portraitWidth +=36
            }
        }
        */

        let newHFWidth = landscapeWidth + portraitWidth;
        setHFWidth(newHFWidth);
    }

    /*
    window.addEventListener('scroll', (e =>{
        e.preventDefault();
        let scrollVal=window.scrollY;
        console.log(scrollVal);
        let showcase = document.getElementById("scrollFrame");
        showcase.style.transform = `translate(${-scrollVal}px, ${scrollVal}px)`;
        return null;
    }))
    */

    let oldScrollVal = 0;

    window.addEventListener('wheel', (e =>{

        if(screen.width>640){

            let y = e.deltaY;
            let scrollVal=oldScrollVal+y;
            let showcase = document.getElementById("scrollFrame");
            if(oldScrollVal>-125 && oldScrollVal<4125){
                showcase.style.transform = `translateX(${-scrollVal}px)`;            
                oldScrollVal=scrollVal;
            }
            else if(oldScrollVal>4000){
                oldScrollVal = 4000
            }
            else if(oldScrollVal<0){
                oldScrollVal = 0
            }
    
        }
    }))

    useEffect(()=>{
        calcFrameWidth();
        rbcg();
    }, [])


    return(
        <Fragment>
        
            <div className="sectionWrapper">

                <div className="horizontalFrame" id="scrollFrame" style={{width: HFWidth+"rem"}}>

                    <div className="itemWrapper itemLandscape cover">
                        <div className="item">
                            <p className="tags" style={{marginTop: "auto"}}>I am</p>
                            <p className="jumbotron name">SEJAL</p>
                            <p className="jumbotron name">PANDEY</p>
                            <p className="tags">Activist. Sociologist. Writer. </p>
                            <p className="jumbotron name lhalf">--------&gt;</p>
                        </div>
                    </div>

                    {projects.map(
                        project => (
                            <div className={"itemWrapper " + project.class} key={project.title}>
                                <div className="item">
                                    <h1>{project.type}</h1>
                                    <h2>{project.title}</h2>
                                    <a href={project.rel} target="_blank" referrer="no-referrer">Visit</a>
                                </div>
                            </div>
                        )
                    )}

                    <div className="itemWrapper itemPortrait contactus">
                        <div className="item">
                            <h1>Like my Work</h1>
                            <h2>Get in Touch</h2>
                            <a href="mailto:sejalpandey0901@gmail.com" target="_blank" referrer="no-referrer">Drop an Email</a>
                            <div className="socials">
                                <a href="https://www.instagram.com/sejal_pandey_09/" target="_blank"><i className="fab fa-instagram"></i></a>
                                <a href="https://www.linkedin.com/in/sejal-pandey-b872271b1/" target="_blank"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </Fragment>
    );

}

export default Index;