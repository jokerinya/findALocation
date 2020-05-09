<template>
  <div>
    <div id="modal-template">
      <div class="backdrop"></div>
      <div class="modal">
        <div id="loading-modal-content">
          <div class="modal__content centered">
            <div class="lds-dual-ring"></div>
            <h3>Loading Please Wait</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1000;
}

.modal {
  position: fixed;
  top: 25vh;
  left: 10%;
  width: 80%;
  background: white;
  z-index: 2000;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.modal__content {
  padding: 1rem;
  min-height: 10rem;
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.lds-dual-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #36007c;
  border-color: #36007c transparent #36007c transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>