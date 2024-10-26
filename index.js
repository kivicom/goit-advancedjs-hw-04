import{a as f,i as p,S as y}from"./assets/vendor-BGz2EIcA.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))m(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&m(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function m(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();function h(e){return e.hits.map(a=>`<li class="gallery-item">
	<a class="gallery-link" href="${a.largeImageURL}">
		<img
			class="gallery-image"
			src="${a.webformatURL}"
			alt="${a.tags}"
			/>
	</a>
  <ul class="image-info">
   <li class="image-item-info">
        <span class="text-accent">Likes</span>
        <span class="text-comment">${a.likes}</span>
    </li>
    <li class="image-item-info">
      <span class="text-accent">Views</span>
      <span class="text-comment">${a.views}</span>
    </li>
    <li class="image-item-info">
      <span class="text-accent">Comments</span>
      <span class="text-comment">${a.comments}</span>
    </li>
    <li class="image-item-info">
      <span class="text-accent">Downloads</span>
      <span class="text-comment">${a.downloads}</span>
    </li>
  </ul>
 
</li>`).join("")}f.defaults.baseURL="https://pixabay.com/api/";f.defaults.params={key:"46482476-c2280bd48c83d7184446264f8",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15};async function g(e,a=1){try{return(await f.get("",{params:{q:e,page:a}})).data}catch(s){throw console.error("Error fetching images:",s),s}}function i(e="Sorry, there are no images matching your search query. Please try again!"){p.error({message:e,position:"topRight"})}const t={gallery:document.querySelector(".gallery"),searchForm:document.getElementById("searchPhoto"),loader:document.querySelector(".loader"),loadMoreBtn:document.getElementById("loadMore"),endMessage:document.getElementById("endMessage")};let l="",n=1,d;t.searchForm.addEventListener("submit",L);t.loadMoreBtn.addEventListener("click",b);async function L(e){e.preventDefault();const a=e.currentTarget;if(l=a.elements.q.value.trim(),!l){i("Please enter a search query");return}n=1,t.loader.classList.remove("loader-off"),t.gallery.innerHTML="",t.loadMoreBtn.classList.add("loader-off"),t.endMessage.classList.add("loader-off");try{const s=await g(l,n);if(s.totalHits===0){i("No images found for this query"),t.loader.classList.add("loader-off");return}u(s),s.hits.length<s.totalHits&&t.loadMoreBtn.classList.remove("loader-off")}catch(s){console.error("Error fetching images:",s),i("Failed to load images")}finally{t.loader.classList.add("loader-off"),a.reset()}}function M(){const{height:e}=t.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}async function b(){n+=1,t.loader.classList.remove("loader-off");try{const e=await g(l,n);u(e),M(),t.gallery.childElementCount>=e.totalHits&&(t.loadMoreBtn.classList.add("loader-off"),t.endMessage.classList.remove("loader-off"))}catch(e){console.error("Error loading more images:",e),i("Failed to load more images")}finally{t.loader.classList.add("loader-off")}}function u(e){const a=h(e);t.gallery.insertAdjacentHTML("beforeend",a),d?d.refresh():d=new y(".gallery a",{captionsData:"alt",captionDelay:250})}
//# sourceMappingURL=index.js.map
