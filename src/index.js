import React from 'react';
import ReactDOM from 'react-dom/client';
//import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import './index.css';
function Square(props){
    if(props.value===-1)
    return (<button background-color="black" className="asquare-md m-1">
        {""}
      </button>)
    else
    return (<button color="primary" className="square-md m-1">
        {props.value===0?"":props.value+""}
      </button>)
}
class Board extends React.Component{
    render(){
        return(<div class ="board">
            <div class="row">
                {this.props.data[0].map((x)=><Square value={x}/>)}
            </div><br/><br/>
            <div class="row">
            {this.props.data[1].map((x)=><Square value={x}/>)}
        </div></div>)
    }
}
class Challenge extends React.Component{
    getInitialState(){
        return {
            data:[[0,1,2,3,4,5,0],[-1,0,0,-1,0,0,-1]],n:5
        }
    }
    constructor(props){
        super(props);
        this.state={data:[[0,1,2,3,4,5,0],[-1,0,0,-1,0,0,-1]],n:5};
    }
    changeN=(val)=>{
        let n=val.target.value;
        let data2=[[],[]];
        for (let i=0;i<=n;i++)data2[0].push(i);
        data2[0].push(0);
        data2[1].push(-1);
        for(let i=1;i<n/2;i++)data2[1].push(0);
        data2[1].push(-1);
        for(let i=1;i<n/2;i++)data2[1].push(0);
        data2[1].push(-1);
        this.setState({data:data2,n:Number(n)});
    }
    test(val){
        console.log(1);
        this.changeN(val.target.value);
    }
    moveRight=()=>{
        let data2=[[],[]]
        let newd=[],newd2=[];
        for(let i=0;i<this.state.n+2;i++){
            if(this.state.data[0][i]!==0)newd.push(this.state.data[0][i]);
            else newd2.push(0);
        }
        data2[0]=newd2.concat(newd);
        newd=[];
        for(let i=1;i<=(this.state.n-1)/2;i++){
            if(this.state.data[1][i]!==0)newd.push(this.state.data[1][i]);
            else newd.unshift(0);
        }
        newd.push(-1);newd.unshift(-1);
        let rn=[]
        for(let i=(this.state.n-1)/2+2;i<this.state.n+1;i++){
            if(this.state.data[1][i]!==0)rn.push(this.state.data[1][i]);
            else rn.unshift(0);
        }
        rn.push(-1);
        data2[1]=newd.concat(rn)
        this.setState({data:data2,n:this.state.n});

    }
    moveL=()=>{
        let data2=[[],[]]
        let newd=[];
        let newd2=[];
        for(let i=0;i<this.state.n+2;i++){
            if(this.state.data[0][i]!==0)newd.push(this.state.data[0][i]);
            else newd2.push(0);
        }
        data2[0]=newd.concat(newd2);
        newd=[];
        newd2=[];
        for(let i=1;i<=(this.state.n-1)/2;i++){
            if(this.state.data[1][i]!==0)newd.push(this.state.data[1][i]);
            else newd2.push(0);
        }
        newd=newd.concat(newd2);
        newd2=[]
        newd.push(-1);newd.unshift(-1);
        let rn=[]
        for(let i=(this.state.n-1)/2+2;i<this.state.n+1;i++){
            if(this.state.data[1][i]!==0)rn.push(this.state.data[1][i]);
            else newd2.push(0);
        }
        rn=rn.concat(newd2)
        rn.push(-1);
        data2[1]=newd.concat(rn)
        this.setState({data:data2,n:this.state.n});

    }
    moveU=()=>{
        let data2=[[],[]]
        for(let i=0;i<this.state.n+2;i++){
            if(this.state.data[0][i]===0 &&this.state.data[1][i]!==-1){
                data2[1].push(0);
                data2[0].push(this.state.data[1][i]);
            }
            else{
                data2[0].push(this.state.data[0][i]);
                data2[1].push(this.state.data[1][i]);
            }
        }
        this.setState({data:data2,n:this.state.n});
    }
    moveD=()=>{
        let data2=[[],[]]
        for(let i=0;i<this.state.n+2;i++){
            if(this.state.data[1][i]===0){
                data2[0].push(0);
                data2[1].push(this.state.data[0][i]);
            }
            else{
                data2[0].push(this.state.data[0][i]);
                data2[1].push(this.state.data[1][i]);
            }
        }
        this.setState({data:data2,n:this.state.n});
    }
    render(){
        return (
        <div className='Board'>
            <Board data={this.state.data}/>
            <br/><br/>
            <input type='number' val={this.state.n} onChange={this.changeN}></input>
            <button onClick={() => this.moveL()}>Move Left</button>
            <button onClick={() => this.moveRight()}>Move Right</button>
            <button onClick={() => this.moveU()}>Move Up</button>
            <button onClick={() => this.moveD()}>Move Down</button>
        </div>
        );
    }
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Challenge />);