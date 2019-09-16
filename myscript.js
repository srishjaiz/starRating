var svg_div= document.getElementById("svg-div");
var c=0;

class Path{
    constructor(){
        this.elem='';
        this.fill=undefined;
        this.stroke=undefined;
        this.strokeWidth=undefined;
        this.strokeLinejoin=undefined;
        this.d='';
    }
}
class Rating{
    constructor(el,args){
        
        if (!(el instanceof HTMLElement)) {
            console.error("A HTML Element must be provided in the first argument");
            return null;
        }
        this._elements={};
        this._elements.el=el;
        this._elements.svg=document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this._elements.stars=[];

        this._elements.def={};

        this._elements.def.elem = document.createElementNS("http://www.w3.org/2000/svg", "defs");
       
        this._elements.def.linearGrad_LR = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        this._elements.def.stop_rated_LR = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        this._elements.def.stop_unrated_LR = document.createElementNS("http://www.w3.org/2000/svg", "stop");

        this._elements.def.linearGrad_RL = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        this._elements.def.stop_rated_RL = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        this._elements.def.stop_unrated_RL = document.createElementNS("http://www.w3.org/2000/svg", "stop");

        this._elements.def.linearGrad_TB = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        this._elements.def.stop_rated_TB = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        this._elements.def.stop_unrated_TB = document.createElementNS("http://www.w3.org/2000/svg", "stop");

        this._elements.def.linearGrad_BT = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        this._elements.def.stop_rated_BT = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        this._elements.def.stop_unrated_BT = document.createElementNS("http://www.w3.org/2000/svg", "stop");

        this._elements.def.linearGradStroke_LR = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        this._elements.def.stop_ratedStroke_LR = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        this._elements.def.stop_unratedStroke_LR = document.createElementNS("http://www.w3.org/2000/svg", "stop");

        this._elements.def.linearGradStroke_RL = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        this._elements.def.stop_ratedStroke_RL = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        this._elements.def.stop_unratedStroke_RL = document.createElementNS("http://www.w3.org/2000/svg", "stop");

        this._elements.def.linearGradStroke_TB = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        this._elements.def.stop_ratedStroke_TB = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        this._elements.def.stop_unratedStroke_TB = document.createElementNS("http://www.w3.org/2000/svg", "stop");

        this._elements.def.linearGradStroke_BT = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        this._elements.def.stop_ratedStroke_BT = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        this._elements.def.stop_unratedStroke_BT = document.createElementNS("http://www.w3.org/2000/svg", "stop");

        this.appendLinearGrad(this._elements.def.linearGrad_LR,this._elements.def.stop_rated_LR,this._elements.def.stop_unrated_LR);
        this.appendLinearGrad(this._elements.def.linearGrad_RL,this._elements.def.stop_rated_RL,this._elements.def.stop_unrated_RL);
        this.appendLinearGrad(this._elements.def.linearGrad_TB,this._elements.def.stop_rated_TB,this._elements.def.stop_unrated_TB);
        this.appendLinearGrad(this._elements.def.linearGrad_BT,this._elements.def.stop_rated_BT,this._elements.def.stop_unrated_BT);
        this.appendLinearGrad(this._elements.def.linearGradStroke_LR,this._elements.def.stop_ratedStroke_LR,this._elements.def.stop_unratedStroke_LR);
        this.appendLinearGrad(this._elements.def.linearGradStroke_RL,this._elements.def.stop_ratedStroke_RL,this._elements.def.stop_unratedStroke_RL);
        this.appendLinearGrad(this._elements.def.linearGradStroke_TB,this._elements.def.stop_ratedStroke_TB,this._elements.def.stop_unratedStroke_TB);
        this.appendLinearGrad(this._elements.def.linearGradStroke_BT,this._elements.def.stop_ratedStroke_BT,this._elements.def.stop_unratedStroke_BT);
        
        
        
        this.args=args;

        //configurable attributes
        this._config={};
        this._config.svg_height=500;
        this._config.svg_width=500;
        this._config.fill_rated="#333";
        this._config.fill_unrated="#f8f8f8";
        this._config.star_strokewidth=5;
        this._config.noOfStars=5;
        this._config.stroke_rated="#ccc";
        this._config.stroke_unrated="#333";
        this._config.orientation="LR";
        this._config.rating_value=this._config.noOfStars;
        this._config.padding=5;
        this._config.justify_content="center";
        this._config.align_items="center";
        // console.log(this._config);
        // console.log(this._elements);


        //internal variable
        this._creation=true;
        this._elements.el.appendChild(this._elements.svg);
        this._elements.svg.appendChild(this._elements.def.elem);

        var result=this._validate();
        if (result) {
            this.isRAF=true;
            window.requestAnimationFrame(() => {
                if(typeof this.onPreDraw === 'function'){
                    this.onPreDraw();
                }
                else if(typeof this.onPreDraw !== 'undefined' && typeof this.onPreDraw !== 'function'){
                    console.error("onPreDraw not a function");
                }
                this._draw(result);
            });
        } 
        else {
            console.error("\nStopping execution");
        }
    }
    appendLinearGrad(linearGrad,stop_rated,stop_unrated){
        linearGrad.appendChild(stop_rated);
        linearGrad.appendChild(stop_unrated);
        this._elements.def.elem.appendChild(linearGrad);
    }
    update() {
        var result=this._validate();
        if (result) {
            if(!this.isRAF){
                window.requestAnimationFrame(() => {
                    if(typeof this.onPreDraw === 'function'){
                        this.onPreDraw();
                    }
                    else if(typeof this.onPreDraw !== 'undefined' && typeof this.onPreDraw !== 'function'){
                        console.error("onPreDraw not a function");
                    }
                    this._draw(result);
                });
                this.isRAF = true;
            }
        }
        else {
            console.error("\nStopping execution");
        }
        if(typeof this.onUpdate === 'function'){
            this.onUpdate(this.args);
        }
        else if(typeof this.onUpdate !== 'undefined' && typeof this.onUpdate !== 'function'){
            console.error("onUpdate not a function");
        }
    }
    _setAttribute(ele,attr,userProp,prevProp){
        if(typeof userProp==="undefined"){
            ele.setAttribute(attr,prevProp);
        }
        else if(prevProp!==userProp){
            prevProp=userProp;
            ele.setAttribute(attr,prevProp);            
        }
        return prevProp;
    }
    _draw(result){
        this.isRAF=false;
        if(this._creation){
            let svg_height=this.args.svg_height?this.args.svg_height:this._config.svg_height;
            let svg_width=this.args.svg_width?this.args.svg_width:this._config.svg_width;
            this._elements.svg.setAttribute("width",svg_width);
            this._elements.svg.setAttribute("height",svg_height);
            this._creation=false;
        }
        this._config.svg_width=this._setAttribute(this._elements.svg,"width",this.args.svg_width,this._config.svg_width);
        this._config.svg_height=this._setAttribute(this._elements.svg,"height",this.args.svg_height,this._config.svg_height);

        var noOfStars=this.args.noOfStars?this.args.noOfStars:this._config.noOfStars;
        var star_strokewidth=this.args.star_strokewidth?this.args.star_strokewidth:this._config.star_strokewidth;
        var padding=this.args.padding?this.args.padding:this._config.padding;
        var rating_value=""+(this.args.rating_value?this.args.rating_value:this._config.rating_value);

        var res = rating_value.split(".");
        //updating linear gradient
        if(res.length>1){
            this._putLinerGradient(res[1],result[1],result[2]);
        }

        var box=result[0];
        var currentStars= this._elements.stars.length;
             
        for(let i=currentStars;i<noOfStars;i++){
            let path=new Path();
            path.elem = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            this._elements.stars.push(path);
            this._elements.svg.appendChild(path.elem);
        }
        for(let i=currentStars;i>noOfStars;i--){
            let star=this._elements.stars.pop();
            this._elements.svg.removeChild(star.elem);
        }
        var direction=result[1];
        var flow=result[2];
        var unrated;
        if(direction=="row"){
            if(flow=="reverse"){
                unrated=noOfStars-res[0]-1;
            }
            for(let i=0;i<this._elements.stars.length;i++){
                var start=((box +(2*i)*box + (this._config.svg_width - box*noOfStars)+ star_strokewidth +padding) / 2) + " " + ((this._config.svg_height - box +star_strokewidth +padding) / 2);
                if((flow=="" && res[0]>0) || (flow=="reverse" && unrated>0)){
                    if(flow==""){
                        this._createStar(this._elements.stars[i],box,star_strokewidth,start,padding);
                    }
                    else{
                        this._unrated=true;
                        this._createStar(this._elements.stars[i],box,star_strokewidth,start,padding);
                    }
                }
                else if((flow=="" && res[0]==0) || (flow=="reverse" && unrated==0) && typeof res[1] !== "undefined"){
                    if(flow==""){
                        var rating_frac=
                        {   
                            fill:"url(#rated)",
                            stroke:"url(#rated_stroke)"
                        };
                    }
                    else{
                        var rating_frac=
                        {   
                            fill:"url(#rated_RL)",
                            stroke:"url(#rated_stroke_RL)"
                        };
                    }
                    this._createStar(this._elements.stars[i],box,star_strokewidth,start,padding,rating_frac);               
                }
                else if((flow=="" && res[0]<0) || (flow=="reverse" && unrated<0)){
                    if(flow==""){
                        this._unrated=true;
                        this._createStar(this._elements.stars[i],box,star_strokewidth,start,padding);
                    }
                    else{
                        this._createStar(this._elements.stars[i],box,star_strokewidth,start,padding);
                    }
                }
                if(flow==""){
                    res[0]--;
                }
                else{
                    unrated--;
                }
            }
        }
        else{
            if(flow=="reverse"){
                unrated=noOfStars-res[0]-1;
            }
            for(let i=0;i<this._elements.stars.length;i++){
                var start=((box + (this._config.svg_width - box)+ star_strokewidth) / 2) + " " + (((2*i)*box +this._config.svg_height - box*noOfStars +star_strokewidth) / 2);
                if((flow=="" && res[0]>0) || (flow=="reverse" && unrated>0)){
                    if(flow==""){
                        this._createStar(this._elements.stars[i],box,star_strokewidth,start,padding);
                    }
                    else{
                        this._unrated=true;
                        this._createStar(this._elements.stars[i],box,star_strokewidth,start,padding);
                    }
                }
                else if((flow=="" && res[0]==0) || (flow=="reverse" && unrated==0) && typeof res[1] !== "undefined"){
                    if(flow==""){
                        var rating_frac=
                        {   
                            fill:"url(#rated_TB)",
                            stroke:"url(#rated_stroke_TB)"
                        };
                    }
                    else{
                        var rating_frac=
                        {   
                            fill:"url(#rated_BT)",
                            stroke:"url(#rated_stroke_BT)"
                        };
                    }
                    this._createStar(this._elements.stars[i],box,star_strokewidth,start,padding,rating_frac);
                }
                else if((flow=="" && res[0]<0) || (flow=="reverse" && unrated<0)){
                    if(flow==""){
                        this._unrated=true;
                        this._createStar(this._elements.stars[i],box,star_strokewidth,start,padding);
                    }
                    else{
                        this._createStar(this._elements.stars[i],box,star_strokewidth,start,padding);
                    }
                }
                if(flow==""){
                    res[0]--;
                }
                else{
                    unrated--;
                }
            }
        }
        this._setUserAttributes();

        if(typeof this.onDraw === 'function'){
            this.onDraw();
        }
        else if(typeof this.onDraw !== 'undefined' && typeof this.onDraw !== 'function'){
            console.error("onDraw not a function");
        }
    }
    _createStar(pathObj,box,star_strokewidth,start,padding,rating_frac=null){
        var newElement=pathObj.elem;
        var str=
        "m "+start
        +" l "+ (box*1/8) +" "+ (box*3/8) 
        +" h "+ ((box*3/8)-star_strokewidth -padding) 
        +" l -"+ (box/4)+" "+ ((box/4)-star_strokewidth-padding) 
        +" l "+ (box/4) +" "+ ((box*3/8)) 
        +" l -"+ ((box/2)-star_strokewidth-padding) +" -"+ (box/4) 
        +" l -"+((box/2)) +" "+((box/4))
        +" l "+((box/4)+star_strokewidth+padding)+" -"+((box*3/8))
        +" l -"+((box/4)+star_strokewidth+padding)+" -"+((box/4)-star_strokewidth-padding)
        +" h "+((box*3/8))
        +" z";

        if(pathObj.d!==str){
            pathObj.d=this._setAttribute(newElement,"d",str,pathObj.d);
        }
        var fill_rated=this.args.fill_rated?this.args.fill_rated:this._config.fill_rated;
        var fill_unrated=this.args.fill_unrated?this.args.fill_unrated:this._config.fill_unrated;
        var stroke_rated=this.args.stroke_rated?this.args.stroke_rated:this._config.stroke_rated;
        var stroke_unrated=this.args.stroke_unrated?this.args.stroke_unrated:this._config.stroke_unrated;
        
        if(rating_frac){
            if(pathObj.fill!==rating_frac.fill){
                pathObj.fill=this._setAttribute(newElement,"fill",rating_frac.fill,pathObj.fill);
            }
            if(pathObj.stroke!==rating_frac.stroke){
                pathObj.stroke=this._setAttribute(newElement,"stroke",rating_frac.stroke,pathObj.stroke);
            }
        }
        else{
            if(this._unrated){
                if(pathObj.fill!==fill_unrated){
                    pathObj.fill=this._setAttribute(newElement,"fill",fill_unrated,pathObj.fill);
                }
                if(pathObj.stroke!==stroke_unrated){
                    pathObj.stroke=this._setAttribute(newElement,"stroke",stroke_unrated,pathObj.stroke);
                }
                this._unrated=false;
            }
            else{
                if(pathObj.fill!==fill_rated){
                    pathObj.fill=this._setAttribute(newElement,"fill",fill_rated,pathObj.fill);
                }
                if(pathObj.stroke!==stroke_rated){
                    pathObj.stroke=this._setAttribute(newElement,"stroke",stroke_rated,pathObj.stroke);
                }
            }
        }
        if(pathObj.strokeWidth!==star_strokewidth){
            pathObj.strokeWidth=this._setAttribute(newElement,"stroke-width",star_strokewidth,pathObj.strokeWidth);
        }
        if(pathObj.strokeLinejoin!=="round"){
            pathObj.strokeLinejoin=this._setAttribute(newElement,"stroke-linejoin","round",pathObj.strokeLinejoin);
        }
    }
    _putLinerGradient(frac,direction,flow){
        
        if(frac.length==1){
            frac=frac+"0";
        }
        else if(frac.length>2){
            frac="."+frac;
            frac=Number(frac);
            frac = frac.toFixed(2);
            let res2= frac.split(".");
            frac=res2[1];
        }
        if(direction==="row"){
            var dir= [100,0];
        }
        else{
            var dir= [0,100];
        }
        if(flow==="reverse"){
            frac=100-frac;
        }
        var fill_rated=this.args.fill_rated?this.args.fill_rated:this._config.fill_rated;
        var fill_unrated=this.args.fill_unrated?this.args.fill_unrated:this._config.fill_unrated;
        var stroke_rated=this.args.stroke_rated?this.args.stroke_rated:this._config.stroke_rated;
        var stroke_unrated=this.args.stroke_unrated?this.args.stroke_unrated:this._config.stroke_unrated;
        
        this._setLinearGrad(this._elements.def.linearGrad_LR,this._elements.def.stop_rated_LR,this._elements.def.stop_unrated_LR,"rated",frac,fill_rated,fill_unrated,dir);
        this._setLinearGrad(this._elements.def.linearGradStroke_LR,this._elements.def.stop_ratedStroke_LR,this._elements.def.stop_unratedStroke_LR,"rated_stroke",frac,stroke_rated,stroke_unrated,dir);
        this._setLinearGrad(this._elements.def.linearGrad_RL,this._elements.def.stop_rated_RL,this._elements.def.stop_unrated_RL,"rated_RL",frac,fill_unrated,fill_rated,dir);
        this._setLinearGrad(this._elements.def.linearGradStroke_RL,this._elements.def.stop_ratedStroke_RL,this._elements.def.stop_unratedStroke_RL,"rated_stroke_RL",frac,stroke_unrated,stroke_rated,dir);
        this._setLinearGrad(this._elements.def.linearGrad_TB,this._elements.def.stop_rated_TB,this._elements.def.stop_unrated_TB,"rated_TB",frac,fill_rated,fill_unrated,dir);
        this._setLinearGrad(this._elements.def.linearGradStroke_TB,this._elements.def.stop_ratedStroke_TB,this._elements.def.stop_unratedStroke_TB,"rated_stroke_TB",frac,stroke_rated,stroke_unrated,dir);
        this._setLinearGrad(this._elements.def.linearGrad_BT,this._elements.def.stop_rated_BT,this._elements.def.stop_unrated_BT,"rated_BT",frac,fill_unrated,fill_rated,dir);
        this._setLinearGrad(this._elements.def.linearGradStroke_BT,this._elements.def.stop_ratedStroke_BT,this._elements.def.stop_unratedStroke_BT,"rated_stroke_BT",frac,stroke_unrated,stroke_rated,dir);
    }
    _setLinearGrad(linearEl,stop_rated,stop_unrated,id,offset,rated,unrated,direction) {
        linearEl.setAttribute("id",id);
        linearEl.setAttribute("x1","0");
        linearEl.setAttribute("y1","0");
        linearEl.setAttribute("x2",direction[0]+"%");
        linearEl.setAttribute("y2",direction[1]+"%");
    
        stop_rated.setAttribute("offset",offset+"%");
        stop_rated.setAttribute("style","stop-color:"+rated+";stop-opacity:1");
        stop_unrated.setAttribute("offset","0");
        stop_unrated.setAttribute("style","stop-color:"+unrated+";stop-opacity:1");
    }
    _validate(){
        var setUserAttributes=true;
        var direction,flow,box;
        if(typeof this.args.orientation!== "undefined"){
            if(!(this.args.orientation==="LR" || this.args.orientation==="RL" || this.args.orientation==="TB" || this.args.orientation==="BT")){
                this.args.orientation=this._config.orientation;
                console.warn("Invalid Orientation, setting it to prev config");
            }
        }
        // else{
        //     this.args.orientation=this._config.orientation;
        // }
        // !this.args.svg_height || 
        // !this.args.svg_width ||
        // !this.args.noOfStars ||
        if( typeof this.args.svg_height !== "undefined"){
            this.args.svg_height=+this.args.svg_height;
            if(this.args.svg_height<10){
                this.args.svg_height=this._config.svg_height;
                console.warn("invalid svg height, setting it to prev config");
            }
        }
        // else{
        //     this.args.svg_height=this._config.svg_height;
        // }

        if(typeof this.args.svg_width !== "undefined"){
            this.args.svg_width=+this.args.svg_width;
            if(this.args.svg_width<10){
                this.args.svg_width=this._config.svg_width;
                console.warn("invalid svg width, setting it to prev config");
            }
        }
        // else{
        //     this.args.svg_width=this._config.svg_width;
        // }

        if(typeof this.args.noOfStars!== "undefined"){
            this.args.noOfStars=+this.args.noOfStars; 
            if( isFloat(this.args.noOfStars) || this.args.noOfStars<0){
                this.args.noOfStars=this._config.noOfStars;
                console.warn("invalid No Of Stars, setting it to prev config");
            }
        }
        // else{
        //     this.args.noOfStars=this._config.noOfStars;
        // }

        if(typeof this.args.stroke_rated!== "undefined"){
            this.args.stroke_rated=""+(this.args.stroke_rated);
            if(startsWithHash(this.args.stroke_rated) && !checkHex(this.args.stroke_rated)){
                this.args.stroke_rated=this._config.stroke_rated;
                console.warn("invalid stroke rated, setting it to prev config");
            }
        }
        // else{
        //     this.args.stroke_rated=this._config.stroke_rated;
        // }

        if(typeof this.args.stroke_unrated!== "undefined"){
            this.args.stroke_unrated=""+(this.args.stroke_unrated);
            if(startsWithHash(this.args.stroke_unrated) && !checkHex(this.args.stroke_unrated)){
                this.args.stroke_unrated=this._config.stroke_unrated;
                console.warn("invalid stroke unrated, setting it to prev config");
            }
        }
        // else{
        //     this.args.stroke_unrated=this._config.stroke_unrated;
        // }

        if(typeof this.args.fill_rated!== "undefined"){
            this.args.fill_rated=""+(this.args.fill_rated);
            if(startsWithHash(this.args.fill_rated) && !checkHex(this.args.fill_rated)){
                this.args.fill_rated=this._config.fill_rated;
                console.warn("invalid fill rated, setting it to prev config");
            }
        }
        // else{
        //     this.args.fill_rated=this._config.fill_rated;
        // }

        if(typeof this.args.fill_unrated!== "undefined"){
            this.args.fill_unrated=""+(this.args.fill_unrated);
            if(startsWithHash(this.args.fill_unrated) && !checkHex(this.args.fill_unrated)){
                this.args.fill_unrated=this._config.fill_unrated;
                console.warn("invalid fill unrated, setting it to prev config");
            }
        }
        // else{
        //     this.args.fill_unrated=this._config.fill_unrated;
        // }

        if(typeof this.args.justify_content!== "undefined"){
            if(!(this.args.justify_content==="center" || this.args.justify_content==="start" || this.args.justify_content==="end" || this.args.justify_content==="space-evenly")){
                this.args.justify_content=this._config.justify_content;
                console.warn("Invalid justify_content, setting it to prev config");
            }
        }
        // else{
        //     this.args.justify_content=this._config.justify_content;
        // }

        if(typeof this.args.align_items!== "undefined"){
            if(!(this.args.align_items==="center" || this.args.align_items==="start" || this.args.align_items==="end")){
                this.args.align_items=this._config.align_items;
                console.warn("Invalid align_items, setting it to prev config");
            }
        }
        // else{
        //     this.args.align_items=this._config.align_items;
        // }

        if(typeof this.args.padding!== "undefined"){
            this.args.padding=+this.args.padding; //box checking is req
            if((!this.args.padding && this.args.padding!==0) || this.args.padding<0){ 
                this.args.padding=this._config.padding;
                console.warn("invalid padding, setting it to prev config");
            }
        }
        // else{
        //     this.args.padding=this._config.padding;
        // }

        if(typeof this.args.star_strokewidth!== "undefined"){
            this.args.star_strokewidth=+this.args.star_strokewidth;//box checking is req
            if((!this.args.star_strokewidth && this.args.star_strokewidth!==0) || this.args.star_strokewidth<0){
                this.args.star_strokewidth=this._config.star_strokewidth;
                console.warn("invalid strokewidth, setting it to prev config");
            }
        }
        // else{
        //     this.args.star_strokewidth=this._config.star_strokewidth;
        // }

        var noOfStars=this.args.noOfStars?this.args.noOfStars:this._config.noOfStars;
        var svg_width= this.args.svg_width?this.args.svg_width:this._config.svg_width;
        var svg_height= this.args.svg_height?this.args.svg_height:this._config.svg_height;
        var orientation= this.args.orientation?this.args.orientation:this._config.orientation;
        
        //calculaing rating value        
        if(typeof this.args.rating_value!== "undefined"){ 
            this.args.rating_value=+this.args.rating_value; 
            if((!this.args.rating_value && this.args.rating_value!==0) || this.args.rating_value<0){
                if(this._config.rating_value>noOfStars){
                    this.args.rating_value=noOfStars;
                    console.warn("invalid rating value, setting it to no of stars, prev config greater than no of stars");
                }
                else{
                    this.args.rating_value=this._config.rating_value;
                    console.warn("invalid rating value, setting it to prev config");
                }    
            }
            else if(this.args.rating_value>noOfStars){
                this.args.rating_value=noOfStars;
                //console.warn("rating value greater than no of stars, setting it to no of stars");
            }
        }
        // else{
        //     this.args.rating_value=this._config.rating_value;
        // }

        //calculaing box size        
        if(orientation==="LR" || orientation==="RL"){
            direction="row";
        }
        else{
            direction="col";
        }
        if(orientation==="RL" || orientation==="BT"){
            flow="reverse";
        }
        else{
            flow="";
        }
        
        if(direction==="row"){
            let width=svg_width/noOfStars;
            box=Math.min(width,svg_height);
        }
        else{
            let height=svg_height/noOfStars;
            box=Math.min(height,svg_width);
        }
        if(box<10){
            setUserAttributes=false;
            box=0;
            console.error("Box size is less than 10");
        }
        else if(box<=80){
            this.args.padding=0;
            //console.warn("padding cannot be given to box size less than 50, setting it to 0");
            this.args.star_strokewidth=0;
            //console.warn("strokewidth cannot be given to box size less than 50, setting it to 0");
        }
        else{
            if(this.args.padding>(0.1*box)){
                console.warn("padding cannot be greater than 10% of box size, setting it to 10% of box size");
                this.args.padding=(0.1*box);
            }
            if(this.args.star_strokewidth>(0.1*box)){
                console.warn("strokewidth value cannot be greater than 10% of box size, setting it to 10% of box size");
                this.args.star_strokewidth=(0.1*box);
            }
        }

        if(setUserAttributes){
            return [box,direction,flow];
        }
        else{
            return null;
        }
    }

    _setUserAttributes(){
        this._config.svg_height=this.args.svg_height?this.args.svg_height:this._config.svg_height;
        this._config.svg_width=this.args.svg_width?this.args.svg_width:this._config.svg_width;
        this._config.fill_rated=this.args.fill_rated?this.args.fill_rated:this._config.fill_rated;
        this._config.fill_unrated=this.args.fill_unrated?this.args.fill_unrated:this._config.fill_unrated;
        this._config.star_strokewidth=this.args.star_strokewidth?this.args.star_strokewidth:this._config.star_strokewidth;
        this._config.noOfStars=this.args.noOfStars?this.args.noOfStars:this._config.noOfStars;
        this._config.stroke_rated=this.args.stroke_rated?this.args.stroke_rated:this._config.stroke_rated;
        this._config.stroke_unrated=this.args.stroke_unrated?this.args.stroke_unrated:this._config.stroke_unrated;
        this._config.orientation=this.args.orientation?this.args.orientation:this._config.orientation;
        this._config.rating_value=this.args.rating_value?this.args.rating_value:this._config.rating_value;
        this._config.padding=this.args.padding?this.args.padding:this._config.padding;
        this._config.justify_content=this.args.justify_content?this.args.justify_content:this._config.justify_content;
        this._config.align_items=this.args.align_items?this.args.align_items:this._config.align_items;
    }   
}
//function to check if input is float or not
function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}
//function to check if input is hex value or not
function checkHex(value){
	return /^#([A-Fa-f0-9]{3}$)|([A-Fa-f0-9]{6}$)/.test(value)
}
function startsWithHash(value){
	return /^#/.test(value)
}