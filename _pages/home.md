---
title: "Respiratory Local Immune Cell Atlas - Home"
layout: homelay
excerpt: "Respiratory Local Immune Cell Atlas - Developmental Lung Data Centre: Facilitating Developmental Lung Research With Big Data"
sitemap: true
permalink: /
---
<!-- <div class="container"> -->
<br>
<br>
<p class="text-center" style="color:#020e65; font-size:40px;">Respiratory Local Immune Cell Atlas</p>
<p class="text-center" style="font-size:20px;">The respiratory local immune atlas provide the dynamic changes of immune cells in human respiratory system across human life-span after born, covering stages of development, maturation, and aging. 
</p>
<div class="wrapper box_style">
<div class="well" style="border: 0px solid #C9C9C9; background-color: #fff;">
<section class="sectiontitle"> 
<div>
<div markdown="0" id="carousel" class="carousel slide" data-ride="carousel" data-interval="4000" data-pause="hover" >
    <!-- Menu -->
<ol class="carousel-indicators">
<li data-target="#carousel" data-slide-to="0" class="active"></li>
<li data-target="#carousel" data-slide-to="1"></li>
<li data-target="#carousel" data-slide-to="2"></li>
<li data-target="#carousel" data-slide-to="3"></li>
<li data-target="#carousel" data-slide-to="4"></li>
<li data-target="#carousel" data-slide-to="5"></li>        
</ol>

<div class="carousel-inner" markdown="0">
<div class="item active">
<img src="{{ site.url }}{{ site.baseurl }}/images/homePage/age.png" alt="Slide 1" style=" width:1150px; height:300px;object-fit: cover;border-radius:0%;display: block; margin: 0 auto;"/>
</div>
<div class="item ">
<img src="{{ site.url }}{{ site.baseurl }}/images/homePage/celltype_age_proportion.png" alt="Slide 2" style=" width:600px; height:300px;object-fit: cover;border-radius:0%;display: block; margin: 0 auto;"/>
</div>
 <div class="item">
<img src="{{ site.url }}{{ site.baseurl }}/images/homePage/marker.png" alt="Slide 2" style=" width:900px;  height:300px;object-fit: cover;border-radius:0%;display: block; margin: 0 auto;"/>
</div>
<div class="item">
<img src="{{ site.url }}{{ site.baseurl }}/images/homePage/celltype_age_relation.png" alt="Slide 3" style="width:1150px; height:300px;object-fit: cover;border-radius:0%;display: block; margin: 0 auto;"/>
</div>
<!--<div class="item">
<img src="{{ site.url }}{{ site.baseurl }}/images/homePage/age.png
" alt="Slide 4" style=" width:1000px; object-fit: cover;border-radius:0%;display: block; margin: 0 auto;"/>
</div>
<div class="item">
<img src="{{ site.url }}{{ site.baseurl }}/images/homePage/age.png
" alt="Slide 4" style=" width:1000px; object-fit: cover;border-radius:0%;display: block; margin: 0 auto;"/>
</div>  -->
</div>
<a class="left carousel-control" href="#carousel" role="button" data-slide="prev">
<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
<span class="sr-only">Previous</span>
</a>
<a class="right carousel-control" href="#carousel" role="button" data-slide="next">
<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
<span class="sr-only">Next</span>
</a>
</div>
<br>
</div>
<!-- style -->
<style>
.wrapper.box_style.line {
border-width: 0;
}
</style>



<br/>
<p class="text-center" style="color:#020e65; font-size:30px;">The UMAP of Respiratory Local Immune Cell Atlas</p>
<div class="container">
<div class="row" >
<div class="image-container">
<img id="photo" src="{{ site.url }}{{ site.baseurl }}/images/homePage/umap.png" alt="Default Photo" style="height: 500px; width=500px">
</div>
</div>
</div>

<h3 style="color:#020e65">Cite us </h3>
<div class="left-aligned" style="width: 100%;">
Chen, X., Huang, Y., Huang, L. et al. <strong style="color:#020e65;font-weight: bold">A Respiratory Local Immune Cell Atlas integrating single-cell transcriptomes across human brain regions. 10.1038/s41591-024-03150-z.</strong><br>
<!-- <a> Unpublished</a> -->
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    var adultButton = document.querySelector('.col-lg-4:nth-child(1) .card-clickable');
    adultButton.click();
  });
  function showImage0(photoName) {
    var photoElement = document.getElementById('photo');
    photoElement.src = photoName;
    photoElement.alt = photoName;
  }
</script>

<style>
  .image-container {
    max-width: 100%;
    max-height: 100%;
    background-color: none;
    justify-content: center;
    align-items: center;
    box-shadow: none;
  }
  
  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
<style>
    .photo-card {
/*         width: 350px;
        height: 350px; */
        border: 10px solid #ccc; 
        overflow: hidden;
        border-radius: 50%;
        position: relative;
        background-size: cover;
 /*        display: flex;  
        justify-content: right; /* 水平居中对齐 */
        /* align-items: right;  */
    }
    .photo-card:hover img {
        transform: scale(1.1);
    }
    .photo-card img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
    }
    .photo-card.clicked {
        border-color: #020e65;
    }
</style>
<script>
  var clickedCard = null;

  function handleClick(card) {
    if (clickedCard !== null) {
      clickedCard.classList.remove("clicked");
    }

    card.classList.add("clicked");
    clickedCard = card;
  }
</script>

<style>
    .custom-column {
        margin: 0 10px; /* 设置列之间的间距 */
        text-align: center
    }
</style>
