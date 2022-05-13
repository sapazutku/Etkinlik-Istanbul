<template>
  <div class="container">
    <h2 id="main-title">Etkinlik İstanbul Nedir ?</h2>
    <br />
    <br />
    <br />
    <h3 id="title">
      Etkinlik İstanbul, İBB Sürdürülebilir Şehirler Hackhatonu yarışması için
      Microsoft desteğiyle tasarlanmış bir web uygulamasıdır. Etkinlik
      İstanbul'un amacı; İstanbul'da bulunan amatör müzik gruplarının ya da
      müzisyenlerin parklarda, bahçelerde ve yeşil alanlarda mesleğini icra
      etmesini sağlamaktır. Bunu da bir etkinlik takip platformu oluşturarak
      müzisyenlerin hem İstanbul Büyükşehir Belediyesi'ne hem de vatandaşlara
      ulaşmasını sağlar.
      <br />
      <hr />
      
    </h3>

    <ol id="list">
      <label>Bu projenin başlıca amaçları şunlardır.</label>
      <li>Amatör müzisyenlere kendilerini gösterme şansı vermek</li>
      <li>
        İBB'nin onay mekanizması ile doğacak sorunların önlenmesini sağlamak
      </li>
      <li>Yeşil ile daha çok buluşmak</li>
    </ol>
    <hr />
    <h3 align="left">Kullandığımız Teknolojiler</h3>
    <br />
    <br />
    <div class="img">
      <div class="columns">
        
        <div class="column">
          <img
            height="100"
            width="100"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg"
          />
        </div>
        <div class="column">
          <img
            height="100"
            width="100"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg"
          />
        </div>
        <div class="column">
          <img
            height="100"
            width="100"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original-wordmark.svg"
          />
        </div>
        <div class="column">
          <img
            height="200"
            width="100"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg"
          />
        </div>
        <div class="column">
          <img height="100" width="100" src="@/assets/buefy.png" />
        </div>
        <div class="column">
          <img height="100" width="150" src="@/assets/leaflet-logo.png" />
        </div>
      </div>
      <hr>
      <h3 align="left">Destekleyenler</h3>
      <div class="columns">
        <div class="column">
          <img height="100" width="200" src="@/assets/microsoft_logo.png" />
        </div>
        <div class="column">
          <img height="100" width="100" src="@/assets/ibb_logo.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.columns {
  justify-content: center;
}
.column {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 100%;
  height: 100%;
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h3{
  text-align: center;
  
}
#title{
  float: left;
  width: 100%;
  font-size: 20px;
}
#list{
  text-align: left;
  justify-content: center;
  margin-left: 30%;
  font-size: 20px;
}
#main-title {
  font-size: 2rem;
  font-weight: bold;
  color: #242140;
  text-align: center;
}
</style>