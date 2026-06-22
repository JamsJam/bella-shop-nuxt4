<template>
    <Head>
      <Title>My App</Title>
      <Meta
        name="description"
        content="This is my awesome Nuxt 3 app"
      />
      <Meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <Meta
        name="keywords"
        content="Nuxt, Vue, JavaScript, Web Development"
      />
      <Meta
        name="author"
        content="Your Name"
      />
      <Meta
        name="robots"
        content="index, follow"
      /> 
      <Meta
        name="OpenGraph"
        content="This is my awesome Nuxt 3 app"
      />
    </Head>
    <NuxtPage />

</template>

<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.3s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }
</style>

