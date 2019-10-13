import React, { Component } from 'react';
import './counter.css';
import Form from './Form.js';

const API_KEY = "ff1c727c203d7dc6bbf99490488b30c743613538";

class Counter extends Component {

    getAQI = async (a) => {
        a.preventDefault();
        const city = a.target.elements.city.value;
        const api_call = await fetch(`https://api.waqi.info/feed/${city}/?token=${API_KEY}`)
        const data = await api_call.json();
        console.log(data);
        this.setState({
            hazeIndex: data.data.aqi
        });
    }

    state = {
        displayDate: 0,
        hazeIndex: 0,
        city: "manchester",
    };

    updateCity(update){
        this.setState({hazeIndex: update.target.hazeIndex});
    }

    render() {
        let fulldate = new Date();
        let day = fulldate.getDay()
        let date = fulldate.getDate()
        let month = fulldate.getMonth()+1
        let year = fulldate.getFullYear()
        let dayfull = "";
        let indexColor = 'black';

        let hazeI = this.state.hazeIndex;
        if(hazeI>0&&hazeI<=50){
            indexColor = 'blue';
        }else if(hazeI>50&&hazeI<=100){
            indexColor = 'green';
        }else if(hazeI>100&&hazeI<=200){
            indexColor = 'yellow';
        }else if(hazeI>200&&hazeI<=300){
            indexColor = 'orange';
        }else if(hazeI>300){
            indexColor = 'red';
        }

        switch(day){
            case 0: dayfull="Sunday"; break;
            case 1: dayfull="Monday"; break;
            case 2: dayfull="Tuesday"; break;
            case 3: dayfull="Wednesday"; break;
            case 4: dayfull="Thursday"; break;
            case 5: dayfull="Friday"; break;
            case 6: dayfull="Saturday"; break;
            default: break;
        }
        return (
            <div>
                <center>
                <div className="today">
                    {dayfull + " " +date+"/"+month+"/"+year}
                </div>
                </center>
                <div className="index-container">
                    
                    <center><h2>Air Pollution Index : </h2>
                    <span className="haze-index-s"><div style={{color:indexColor}} >{this.state.hazeIndex} {this.indexLevel()}</div></span>
                    
                    <Form getAQI={this.getAQI}/></center>
                    
                </div>
                <div className="iframe-container">
                <center><iframe title="apimsFrame" src="http://apims.doe.gov.my/public_v2/home.html" width="1000px" height="500px">Title</iframe></center>
                </div>
                <div className="data-source">
                    <hr /><h2>Data Source</h2>
                    <p><a href="http://aqicn.org/">aqicn.org</a></p>
                    <p><a href="http://apims.doe.gov.my/">APIMS - Air Pollutant Index of Malaysia</a></p>
                    <hr />
                    
                </div>
                
            </div>
        )
    }
    
    indexLevel(){
        let hazeI = this.state.hazeIndex;
        if(hazeI===0){
            return <p>Health Level</p>;
        }else if(hazeI>0&&hazeI<=50){
            return <p>Good</p>;
        }else if(hazeI>50&&hazeI<=100){
            return <p>Moderate</p>;
        }else if(hazeI>100&&hazeI<=150){
            return <p>Unhealthy for sensitive groups</p>;
        }else if(hazeI>150&&hazeI<=200){
            return <p>Unhealthy</p>;
        }else if(hazeI>200&&hazeI<=300){
            return <p>Very unhealthy</p>;
        }else if(hazeI>300){
            return <p>Hazardous</p>
        }
    }

}

export default Counter;