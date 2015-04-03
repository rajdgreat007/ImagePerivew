var imagePreview = (function () {
    var imageLinks = ["http://static.hdw.eweb4.com/media/thumbs/1/1/165.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/1/127.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/2/14265.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/76/751485.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/117/1165226.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/1/356.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/1/494.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/1/9.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/119/1184074.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/56/558058.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/83/821956.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/1/20.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/75/744711.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/1/49.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/1/632.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/1/1180.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/1/233.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/1/906.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/1/325.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/84/835097.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/130/1293625.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/3/30422.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/1/1153.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/1/366.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/89/889748.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/106/1054986.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/119/1183706.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/109/1083956.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/76/753905.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/1/393.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/84/835713.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/72/713365.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/2/25797.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/1/1808.jpg", "http://static.hdw.eweb4.com/media/thumbs/1/82/819079.jpg"];
    var cachedReferences = {
            innerContainer : document.getElementsByClassName('innerContainer')[0],
            loadedImgIndex : null
    };
    function bindEvent(element, type, handler) {
        if(element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else {
            element.attachEvent('on'+type, handler);
        }
    }
    return {
        init : function(){
            var totalImagesCount = imageLinks.length;
            var li, img;
            for(var i=0;i<totalImagesCount;i++){
                li = document.createElement('li'); li.className='imgLi';
                img = document.createElement('img');
                img.src = imageLinks[i]; img.width='192'; img.height='120'; img.className='imgLink';img.id='img'+(i+1);
                li.appendChild(img);
                cachedReferences.innerContainer.appendChild(li);
            }
        },
        bindEvents : function(){
            bindEvent(cachedReferences.innerContainer, 'click', function(e){
                var event = e||window.event;
                var target = event.target||event.srcElement;
                var imgBig = document.getElementById('imgBig');
                var img, imageIndex, row;
                if(target.className=='imgLink') img = target;
                else if(target.className=='imgLi') img=target.querySelector('img');
                else if(target.id == 'prev'){
                    var prevImg = document.getElementById('img'+(cachedReferences.loadedImgIndex-1));
                    if(prevImg) {
                        imgBig.src = prevImg.src;
                        cachedReferences.loadedImgIndex--;
                    }
                }
                else if(target.id == 'next'){
                    var nextImg = document.getElementById('img'+(cachedReferences.loadedImgIndex+1));
                    if(nextImg) {
                        imgBig.src = nextImg.src;
                        cachedReferences.loadedImgIndex++;
                    }
                }
                if(img){
                    if(imgBig) cachedReferences.innerContainer.removeChild(imgBig.parentNode);
                    imageIndex= parseInt(img.id.replace('img',''));
                    row = Math.ceil(imageIndex/4);
                    var lastElemIndex = row*4;
                    var lastElemOfRow = document.querySelector('#img'+(lastElemIndex));
                    while(lastElemOfRow == null) lastElemOfRow = document.querySelector('#img'+(--lastElemIndex));
                    var li = document.createElement('li'); li.id = 'bigLi';
                    var prev = document.createElement('img'); prev.src='prev-button.png';prev.id='prev';
                    li.appendChild(prev);
                    var image = document.createElement('img');
                    image.src = img.src; image.id='imgBig';
                    li.appendChild(image);
                    var next = document.createElement('img'); next.src='next-button.png';next.id='next';
                    li.appendChild(next);
                    cachedReferences.innerContainer.insertBefore(li, lastElemOfRow.parentNode.nextSibling);
                    cachedReferences.loadedImgIndex = imageIndex;
                }
            });

        }
    }
})();

window.onload  = function(){
  imagePreview.init();
  imagePreview.bindEvents();
};