
export function forceDownload(post){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", post?.image, true);
    xhr.responseType = "blob";
    xhr.onload = function(){
        let urlCreator = window.URL || window.webkitURL;
        let imageUrl = urlCreator.createObjectURL(this.response);
        let tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = post?.title ? post?.title : post?.id;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();

}