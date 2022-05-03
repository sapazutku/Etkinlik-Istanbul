<template>
  <div class="bg-container">
    <div class="container-lg">
      <div class="pagination">
        <span v-for="(menuItem, index) in menuItems" :key="index">
          <li>
            <a>
              <router-link :to="menuItem.link">
                <span class="li">{{ menuItem.name }}</span>
              </router-link>
              
            </a>
          </li>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    //! Menu items
    menuItems: {
      type: Array,
      default: () => [
        {
          name: "Yeşil Park Bul",
          link: "/park",
        },
        {
          name: "Çevre Etkinlikleri",
          link: "/posts",
        },
        {
          name: "Müzik Etkinlikleri",
          link: "/posts",
        },
        {
          name: "Sosyal Etkinlikler",
          link: "/sosyal",
        },
        {
          name: "Çocuk Etkinlikleri",
          link: "/cocuk",
        },
        {
          name: "Müzisyen Başvurusu",
          link: "/basvuru",
        },
      ],
    },
  },
  
};
</script>

<style>
.bg-container {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  margin: 0 auto;
  background-image: url("../assets/ayasofya.jpeg");
  background-size: cover; /* <------ */
  background-position: center center;
  background-repeat: no-repeat;
}
.pagination {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 5%;
  margin-left: 15%;
  padding: 5%;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(92, 118, 109, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(1px);
  border-radius: 10px;
  border: none;
}
li {
  list-style: none;
  font-size: 20px;
  color: rgb(255, 255, 255);
  text-align: center;
  margin: 10px;
  padding: 5%;
  
}

li:hover {
  cursor: pointer;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(92, 118, 109, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(1px);
  border-radius: 10px;
  border: none;
}

a{
  text-decoration: none;
  color: rgb(255, 255, 255);
}
</style>