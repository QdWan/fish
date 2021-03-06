cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        fish:cc.Node,
        leftRota:0,
        rightRota:0
        
    },

    GetRandomNum:function(Min,Max)
    {   
        return Math.round(Math.random() * Max + Min);
    } ,
    
    onActionEnd :function(param)
    {
       this.move();
    },
    
    // use this for initialization
    onLoad: function ()
    {
        this.move();
        this.initEvent();
    },
    
    initEvent : function()
    {
        var self = this;
        var body = cc.find("Canvas/GameFishPool/"+this.fish.name+"/Body");
 
        body.on(cc.Node.EventType.TOUCH_START , function(event)
        {
            var fish = event.target.parent;
            fish.stopAllActions();
            var animation = fish.getComponent(cc.Animation);
            animation.play(fish.initName + "_Web");
            
        });
        
        body.on(cc.Node.EventType.TOUCH_END , function(event)
        {
            var fish = event.target.parent;
            var animation = fish.getComponent(cc.Animation);
            animation.play(fish.initName);
            self.move();
        });
        
        body.on(cc.Node.EventType.TOUCH_MOVE , function(event)
        {
            var fish = event.target.parent;
            fish.position = event.touch._point;
            //console.log("event.touch.potint = " + event.touch._point);
        });
    
    },
    update:function()  
    {
        
    },
    
    move:function()
    {
        var toX = this.GetRandomNum(0,960);
        
        var dir = this.GetRandomNum(0, 1);
        var toY = this.fish.position.y;
        if(dir == 1)
             toY = this.GetRandomNum(0,640);
        
        var speed = this.GetRandomNum(5, 20);
      
        //设置方向
      
        
        //var head = cc.find("Canvas/GameNode/" + this.fish.name + "/Head");
        //var headX =head.convertToWorldSpace(head.position).x ;
        var body = cc.find("Canvas/GameFishPool/"+this.fish.name+"/Body");
        var x = body.convertToWorldSpace(body.position).x;          //转换成世界坐标
        var y = body.position.y;
        
        //console.log("toX = " + toX + " x = " + x);
       // console.log( "dir = " +dir +" speed = " + speed +  " toX= " + toX + " toY = " + toY + " headX = " + headX);
        if(toX != 0)  
        {
            if(toX > x)
                this.fish.rotation=this.rightRota;
            else
                this.fish.rotation=this.leftRota;
        }

        var moveAction = cc.moveTo(speed, toX , toY);
        var endCallFunc = cc.callFunc(this.onActionEnd, this);
        var actionQueue = cc.sequence(moveAction, endCallFunc);
        
        this.fish.runAction(actionQueue);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
