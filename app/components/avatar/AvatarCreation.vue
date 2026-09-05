<template>
  <div class="avatar_creation">
    <div class="avatar_creation_header">
      <h1 class="avatar_creation_header_title">
        Crée ton avatar

        <span>
          <NuxtLink to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 19"
              fill="none"
            >
              <path
                d="M12.4998 15.0416L6.6665 9.49992L12.4998 3.95825"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Retour
          </NuxtLink>
        </span>
      </h1>
      <p>En sélectionnant tes choix parmis les catégories</p>
    </div>
    <div class="avatar_creation_container">
      <div
        class="avatar_creation_container_menu"
        :class="{ deployed_menu: currentCustomizationComponent === '' }"
      >
        <div
          class="avatar_creation_container_menu_buttons"
          :class="{
            deployed_menu_buttons: currentCustomizationComponent === '',
          }"
        >
          <div class="avatar_creation_container_menu_buttons_box">
            <button
              class="avatar_creation_container_menu_buttons_box_item"
              @click="setCurrentCustomizationComponent('skincolors')"
            >
              <div class="svg_wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path
                    d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1m0 13V2a6 6 0 1 1 0 12"
                  />
                </svg>
              </div>
              Couleur de la peau
            </button>
            <button
              class="avatar_creation_container_menu_buttons_box_item"
              @click="setCurrentCustomizationComponent('faces')"
            >
              <div class="svg_wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="visage"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path
                      d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                    />
                    <path
                      d="M6.356 4.164C7.726 2.784 9.622 2 12 2c2.379 0 4.273.785 5.644 2.164c1.156 1.163 1.88 2.69 2.25 4.373c.055.01.11.023.164.038c.869.232 1.429.916 1.702 1.65c.273.736.299 1.605.073 2.449c-.317 1.183-1.165 2.35-2.402 2.665C18.079 18.59 15.086 21 12 21c-3.087 0-6.08-2.412-7.431-5.662c-1.235-.317-2.081-1.483-2.398-2.664c-.226-.844-.2-1.713.073-2.45c.273-.733.833-1.417 1.702-1.65c.053-.014.106-.026.16-.036c.37-1.684 1.094-3.21 2.25-4.374"
                    />
                  </g>
                </svg>
              </div>
              Visage
            </button>
            <button
              class="avatar_creation_container_menu_buttons_box_item"
              @click="setCurrentCustomizationComponent('morphologies')"
            >
              <div class="svg_wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="morpho"
                  viewBox="0 0 512 512"
                >
                  <circle cx="256" cy="56" r="56" />
                  <path
                    d="M437 128H75a27 27 0 0 0 0 54h101.88c6.91 0 15 3.09 19.58 15c5.35 13.83 2.73 40.54-.57 61.23l-4.32 24.45a.42.42 0 0 1-.12.35l-34.6 196.81A27.43 27.43 0 0 0 179 511.58a27.06 27.06 0 0 0 31.42-22.29l23.91-136.8S242 320 256 320c14.23 0 21.74 32.49 21.74 32.49l23.91 136.92a27.24 27.24 0 1 0 53.62-9.6L320.66 283a.45.45 0 0 0-.11-.35l-4.33-24.45c-3.3-20.69-5.92-47.4-.57-61.23c4.56-11.88 12.91-15 19.28-15H437a27 27 0 0 0 0-54Z"
                  />
                </svg>
              </div>
              Morphologie
            </button>
            <button
              class="avatar_creation_container_menu_buttons_box_item"
              @click="setCurrentCustomizationComponent('hairs')"
            >
              <div class="svg_wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="hair"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                    />
                    <path
                      d="M18.8 6.4c-1.884-2.512-4.28-3.9-6.8-3.9c-2.52 0-4.916 1.388-6.8 3.9c-1.417 1.889-3.126 4.44-3.362 7.124c-.121 1.384.147 2.801 1.019 4.15c.861 1.332 2.268 2.531 4.315 3.58c1.259.645 2.63-.22 2.809-1.483a6.48 6.48 0 0 1-1.162-1.001c-1.013-1.105-1.82-2.723-1.82-4.77c0-3.428 1.77-5.735 3.9-6.344c.282-.08.6.132.634.424a5 5 0 0 0 4.917 4.42c.674.006.55 1.06.55 1.5c0 2.047-.806 3.665-1.82 4.77c-.362.396-.76.734-1.164 1.003c.16 1.268 1.518 2.14 2.778 1.531c2.165-1.044 3.643-2.243 4.538-3.585c.907-1.362 1.163-2.797 1.007-4.194c-.3-2.69-2.138-5.257-3.54-7.125Z"
                    />
                  </g>
                </svg>
              </div>
              Cheveux
            </button>
            <button
              class="avatar_creation_container_menu_buttons_box_item"
              @click="setCurrentCustomizationComponent('eyes')"
            >
              <div class="svg_wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                  <g>
                    <path
                      d="M128 56c-80 0-112 72-112 72s32 72 112 72s112-72 112-72s-32-72-112-72m0 112a40 40 0 1 1 40-40a40 40 0 0 1-40 40"
                      opacity=".2"
                    />
                    <path
                      d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.47 133.47 0 0 1 25 128a133.33 133.33 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.46 133.46 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32"
                    />
                  </g>
                </svg>
              </div>
              Yeux
            </button>
            <button
              class="avatar_creation_container_menu_buttons_box_item"
              @click="setCurrentCustomizationComponent('eyesbrow')"
            >
              <div class="svg_wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="eyesbrow"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path
                      d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                    />
                    <path
                      d="M18.937 9.362c1.703.768 3.171 1.921 3.963 3.554a1 1 0 0 1-1.128 1.41C15.815 12.93 9.789 15.33 6.612 16.64c-1.994.822-3.93.151-4.931-1.201a3.364 3.364 0 0 1-.657-2.41c.34-2.805 3.866-4.005 6.192-4.533c3.781-.857 8.148-.748 11.721.865Z"
                    />
                  </g>
                </svg>
              </div>
              Sourcils
            </button>
            <button
              class="avatar_creation_container_menu_buttons_box_item"
              @click="setCurrentCustomizationComponent('noses')"
            >
              <div class="svg_wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="nose"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                    />
                    <path
                      d="M7.27 7.267C7.745 5.096 10 2 12 2c2 0 4.255 3.096 4.73 5.267c.25 1.14.642 2.241 1.164 3.286C18.907 12.577 21 14.043 21 16.5a3.5 3.5 0 0 1-3.5 3.5c-.576 0-1.52-.372-2.053-.106c-.395.198-.662.667-.957.98C13.97 21.424 13.226 22 12 22c-1.226 0-1.97-.576-2.49-1.126c-.295-.313-.562-.782-.957-.98C8.02 19.628 7.076 20 6.5 20A3.5 3.5 0 0 1 3 16.5c0-2.457 2.093-3.922 3.106-5.947A14.056 14.056 0 0 0 7.27 7.267"
                    />
                  </g>
                </svg>
              </div>
              Nez
            </button>
            <button
              class="avatar_creation_container_menu_buttons_box_item"
              @click="setCurrentCustomizationComponent('mouthes')"
            >
              <div class="svg_wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mouthe"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path
                      d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                    />
                    <path
                      d="M20.314 8.038c-1.407-.965-3.372-1.96-5.387-2.036c-.806-.03-1.482.305-2.167.645c-.192.096-.385.191-.581.28c-.155.069-.203.069-.358 0a16.311 16.311 0 0 1-.58-.28c-.685-.34-1.362-.676-2.168-.645c-2.015.076-3.98 1.071-5.387 2.036C2.763 8.67 1 9.684 1 11c0 1.451 1.937 3.116 2.914 3.948C5.73 16.496 8.451 18 12 18c3.549 0 6.27-1.504 8.086-3.05C21.102 14.083 23 12.512 23 11c0-1.277-1.794-2.35-2.686-2.962M12 13c3.153 0 6.182-.49 9-1.391A17.781 17.781 0 0 0 16.367 11c-1.512 0-2.977.188-4.367.54A17.808 17.808 0 0 0 7.633 11c-1.609 0-3.164.213-4.633.609A29.517 29.517 0 0 0 12 13"
                    />
                  </g>
                </svg>
              </div>
              Bouche
            </button>
            <button
              class="avatar_creation_container_menu_buttons_box_item"
              @click="setCurrentCustomizationComponent('clothes')"
            >
              <div class="svg_wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path
                    d="M15.98 31.405a33.929 33.929 0 0 1-7.522-.849A1.863 1.863 0 0 1 7 28.721v-7.774c-4.715-.586-5.993-5.287-6.08-7.172a2.223 2.223 0 0 1 1-1.962a54.932 54.932 0 0 1 5.008-2.959a7.484 7.484 0 0 1 2.5-.573a.979.979 0 0 1 .419.069l.317.126A20.324 20.324 0 0 0 21.9 8.382c.127-.052.263-.08.4-.081h.024a8.15 8.15 0 0 1 2.63.5a.93.93 0 0 1 .125.055c1.694.902 3.34 1.89 4.93 2.964a2.223 2.223 0 0 1 .99 1.96c-.132 2.335-1.57 6.6-5.99 7.162v7.781a1.864 1.864 0 0 1-1.462 1.825c-2.482.568-5.02.855-7.566.857M9 28.627a31.763 31.763 0 0 0 14.008-.008V20a1 1 0 0 1 1-1c4.638 0 4.98-5.113 4.994-5.331a.223.223 0 0 0-.101-.185a53.098 53.098 0 0 0-4.7-2.83a6.205 6.205 0 0 0-1.094-.28c-.04.063-.084.125-.132.184l-5.42 6.7a2 2 0 0 1-3.037.085l-6.08-6.71a2.008 2.008 0 0 1-.128-.156a5.431 5.431 0 0 0-.548.188a54.476 54.476 0 0 0-4.74 2.815a.22.22 0 0 0-.105.2c0 .056.373 5.326 5.08 5.326a1 1 0 0 1 1 1zm.552-18.254l5.707 6.298a1 1 0 0 0 1.518-.042l4.945-6.112a22.25 22.25 0 0 1-1.583.367L15.999 16l-4.697-5.185a22.336 22.336 0 0 1-1.75-.442"
                  />
                </svg>
              </div>
              Vêtements
            </button>
            <button
              class="avatar_creation_container_menu_buttons_box_item"
              @click="setCurrentCustomizationComponent('accessories')"
            >
              <div class="svg_wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12 2a5 5 0 0 0-5 5c0 1.79.94 3.36 2.35 4.24A7 7 0 1 0 19 17.73a1 1 0 0 0-2-.2A5 5 0 1 1 12 12a5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6Z"
                  />
                </svg>
              </div>
              Accessoires
            </button>
          </div>
        </div>
      </div>

      <div
        class="avatar_creation_container_preview"
        :class="{
          unset_bg:
            currentCustomizationComponent === 'eyes' ||
            currentCustomizationComponent === 'mouthes' ||
            currentCustomizationComponent === 'noses' ||
            currentCustomizationComponent === 'eyesbrow' ||
            currentCustomizationComponent === 'faces' ||
            currentCustomizationComponent === 'accessories',
        }"
      >
        <div
          class="avatar_creation_container_preview_image"
          :class="{
            close_up_preview:
              currentCustomizationComponent === 'eyes' ||
              currentCustomizationComponent === 'mouthes' ||
              currentCustomizationComponent === 'noses' ||
              currentCustomizationComponent === 'eyesbrow' ||
              currentCustomizationComponent === 'faces' ||
              currentCustomizationComponent === 'accessories',
          }"
        >
          <img
            :src="avatarBody"
            alt=""
            class="avatar_creation_container_preview_image_body"
            @error="handleImageError($event, avatarFallbacks.body)"
          />
          <!-- <img v-else-if="avatarPreview.avatarClothing" :src="avatarPreview.avatarClothing.image" alt="" class="avatar_creation_container_preview_image_body"> -->
          <div class="avatar_creation_container_preview_image_face">
            <img
              class="avatar_creation_container_preview_image_face_shadow"
              :src="avatarImage(avatarPreview.face, 'image', avatarFallbacks.face)"
              alt=""
              @error="handleImageError($event, avatarFallbacks.face)"
            />
            <div class="avatar_creation_container_preview_image_face_hair">
              <img
                class="avatar_creation_container_preview_image_face_hair_front"
                :src="
                  avatarImage(
                    avatarPreview.hair,
                    'frontImage',
                    avatarFallbacks.hairFront
                  )
                "
                alt=""
                @error="handleImageError($event, avatarFallbacks.hairFront)"
              />
              <img
                class="avatar_creation_container_preview_image_face_hair_back"
                :src="
                  avatarImage(
                    avatarPreview.hair,
                    'backImage',
                    avatarFallbacks.hairBack
                  )
                "
                alt=""
                @error="handleImageError($event, avatarFallbacks.hairBack)"
              />
            </div>
            <div class="avatar_creation_container_preview_image_face_eyebrow">
              <img
                class="avatar_creation_container_preview_image_face_eyebrow_shadow"
                :src="
                  avatarImage(
                    avatarPreview.eyebrow,
                    'image',
                    avatarFallbacks.eyebrow
                  )
                "
                alt=""
                @error="handleImageError($event, avatarFallbacks.eyebrow)"
              />
            </div>
            <div class="avatar_creation_container_preview_image_face_eyes">
              <img
                class="avatar_creation_container_preview_image_face_eyes_shadow"
                :src="avatarImage(avatarPreview.eyes, 'image', avatarFallbacks.eyes)"
                alt=""
                @error="handleImageError($event, avatarFallbacks.eyes)"
              />
            </div>
            <div class="avatar_creation_container_preview_image_face_nose">
              <img
                class="avatar_creation_container_preview_image_face_nose_shadow"
                :src="avatarImage(avatarPreview.nose, 'image', avatarFallbacks.nose)"
                alt=""
                @error="handleImageError($event, avatarFallbacks.nose)"
              />
            </div>
            <div class="avatar_creation_container_preview_image_face_mouth">
              <img
                class="avatar_creation_container_preview_image_face_mouth_shadow"
                :src="
                  avatarImage(avatarPreview.mouth, 'image', avatarFallbacks.mouth)
                "
                alt=""
                @error="handleImageError($event, avatarFallbacks.mouth)"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="avatar_creation_container_choices">
        <AvatarSkinColors
          v-if="currentCustomizationComponent === 'skincolors'"
          :selected-skin-color="avatarPreview.skincolor"
          @select-skincolor="handleSkinColorSelection"
        />
        <AvatarFaces
          v-if="currentCustomizationComponent === 'faces'"
          :selected-face="avatarPreview.face"
          :selected-skin-color="avatarPreview.skincolor"
          :selected-accessory="avatarPreview.accessory"
          @select-face="handleFaceSelection"
        />
        <AvatarAccessories
          v-if="currentCustomizationComponent === 'accessories'"
          :selected-face="avatarPreview.face"
          @select-accessory-face="handleAccessoryFaceSelection"
        />
        <AvatarMorphologies
          v-if="currentCustomizationComponent === 'morphologies'"
          :selected-morphotype="avatarPreview.morphotype"
          :selected-morphology="avatarPreview.morphology"
          :skincolor="avatarPreview.skincolor"
          :clothing-slug="avatarPreview.clothingSlug"
          @select-morphology="handleMorphologySelection"
          @select-morphotype="handleMorphotypeSelection"
        />
        <AvatarHairs
          v-if="currentCustomizationComponent === 'hairs'"
          :selected-hair="avatarPreview.hair"
          :selected-hair-color="avatarPreview.haircolor"
          @select-hair="handleHairSelection"
          @select-haircolor="handleHairColorSelection"
        />
        <AvatarEyes
          v-if="currentCustomizationComponent === 'eyes'"
          :selected-eyes="avatarPreview.eyes"
          :selected-eyes-color="avatarPreview.eyecolor"
          @select-eye="handleEyeSelection"
          @select-eyecolor="handleEyeColorSelection"
        />
        <AvatarEyesBrow
          v-if="currentCustomizationComponent === 'eyesbrow'"
          :selected-eyebrow="avatarPreview.eyebrow"
          :selected-eyebrow-color="avatarPreview.eyebrowcolor"
          @select-eyebrow="handleEyeBrowSelection"
          @select-eyebrowcolor="handleEyeBrowColorSelection"
        />
        <AvatarNoses
          v-if="currentCustomizationComponent === 'noses'"
          :selected-nose="avatarPreview.nose"
          :selected-skin-color="avatarPreview.skincolor"
          @select-nose="handleNoseSelection"
        />
        <AvatarMouthes
          v-if="currentCustomizationComponent === 'mouthes'"
          :selected-mouth="avatarPreview.mouth"
          :selected-mouth-color="avatarPreview.mouthcolor"
          @select-mouth="handleMouthSelection"
          @select-mouthcolor="handleMouthColorSelection"
        />
        <AvatarClothes
          v-if="currentCustomizationComponent === 'clothes'"
          :body="avatarPreview.body"
          :clothing-slug="avatarPreview.clothingSlug"
          :morphotype="avatarPreview.morphotype"
          @remove-clothing="handleRemoveClothing"
        />
        <div
          v-if="currentCustomizationComponent !== ''"
          class="return_container"
        >
          <button
            class="button--secondary"
            @click="closeCustomisationComponent"
          >
            Retour
          </button>
          <nuxt-link
            v-if="
              currentCustomizationComponent === 'clothes' &&
              avatarPreview.avatarClothing
            "
            class="button--primary"
            :to="{
              path: '/product/clothing',
              query: {
                product_id:
                  avatarPreview.avatarClothing.top_color_variant_id ||
                  avatarPreview.avatarClothing.bottom_color_variant_id ||
                  avatarPreview.avatarClothing.outfit_color_variant_id,
              },
            }"
          >
            Voir le vêtement
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AvatarEyes from '~/components/avatar/AvatarEyes.vue'
import AvatarHairs from '~/components/avatar/AvatarHairs.vue'
import AvatarMouthes from '~/components/avatar/AvatarMouthes.vue'
import AvatarNoses from '~/components/avatar/AvatarNoses.vue'
import AvatarFaces from '~/components/avatar/AvatarFaces.vue'
import AvatarEyesBrow from '~/components/avatar/AvatarEyesBrow.vue'
import AvatarSkinColors from '~/components/avatar/AvatarSkinColors.vue'
import AvatarMorphologies from '~/components/avatar/AvatarMorphologies.vue'
import AvatarClothes from '~/components/avatar/AvatarClothes.vue'
import AvatarAccessories from '~/components/avatar/AvatarAccessories.vue'

import { useAvatarStore } from '~/stores/avatar'
import { useAvatarCatalogStore } from '~/stores/avatarCatalog'

export default {
  components: {

    AvatarEyes,
    AvatarHairs,
    AvatarMouthes,
    AvatarNoses,
    AvatarFaces,
    AvatarEyesBrow,
    AvatarSkinColors,
    AvatarMorphologies,
    AvatarClothes,
    AvatarAccessories,
  },
  props: {
    initialSkinColors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentCustomizationComponent: '',
      skinColorSelectionId: 0,
      avatarFallbacks: {
        body: '/images/avatar/template_avatar_morphology.webp',
        face: '/images/avatar/template_avatar_face.webp',
        hairFront: '/images/avatar/template_avatar_hair_front.webp',
        hairBack: '/images/avatar/template_avatar_hair_back.webp',
        eyes: '/images/avatar/template_avatar_eyes.webp',
        eyebrow: '/images/avatar/template_avatar_eyebrow.webp',
        nose: '/images/avatar/template_avatar_nose.webp',
        mouth: '/images/avatar/template_avatar_mouth.webp',
      },
    }
  },
  setup(props) {
    const avatarCatalogStore = useAvatarCatalogStore()
    avatarCatalogStore.hydrateSkinColors(props.initialSkinColors)

    return {
      avatarStore: useAvatarStore(),
      avatarCatalogStore,
    }
  },
  computed: {
    avatarPreview: {
      get() {
        return this.avatarStore.model
      },
      set(model) {
        void this.avatarStore.setModel(model)
      },
    },
    clothesId: {
      get() {
        return this.avatarStore.clothesId
      },
      set(clothesId) {
        void this.avatarStore.setClothesId(clothesId)
      },
    },
    avatarBody() {
      return this.avatarStore.avatarBody
    },
  },
  async mounted() {
    await this.retrieveAvatarData()
    await this.avatarCatalogStore.hydrateFromAvatarModel(this.avatarPreview)

    if (!this.avatarPreview.morphotype?.id) {
      const initialSkinColor =
        this.avatarPreview.skincolor || this.avatarCatalogStore.skincolors[0]

      if (initialSkinColor) {
        await this.handleSkinColorSelection(initialSkinColor)
      }
    }
  },
  methods: {
    avatarImage(part, property, fallback) {
      return part?.[property] || fallback
    },
    handleImageError(event, fallback) {
      const image = event.currentTarget

      if (!(image instanceof HTMLImageElement)) {
        return
      }

      const failedSource = image.currentSrc || image.src

      if (image.dataset.failedSource === failedSource) {
        return
      }

      image.dataset.failedSource = failedSource
      image.src = fallback
    },
    closeCustomisationComponent() {
      this.currentCustomizationComponent = ''
    },
    async saveAvatarModel() {
      await this.avatarStore.save()
    },
    async retrieveAvatarData() {
      await this.avatarStore.load()
    },
    setCurrentCustomizationComponent(customizationComponent) {
      if (this.currentCustomizationComponent !== customizationComponent) {
        this.currentCustomizationComponent = customizationComponent
      } else {
        this.currentCustomizationComponent = ''
      }
    },
    handleEyeSelection(eye) {
      this.avatarPreview.eyes = eye
      this.saveAvatarModel()
    },
    handleHairSelection(hair) {
      this.avatarPreview.hair = hair
      this.saveAvatarModel()
    },
    handleMouthSelection(mouth) {
      this.avatarPreview.mouth = mouth
      this.saveAvatarModel()
    },
    handleMouthColorSelection(mouthcolor) {
      this.avatarPreview.mouthcolor = mouthcolor
      this.saveAvatarModel()
    },
    handleNoseSelection(nose) {
      this.avatarPreview.nose = nose
      this.saveAvatarModel()
    },
    handleFaceSelection(face) {
      this.avatarPreview.face = face
      this.avatarPreview.accessory = null
      this.saveAvatarModel()
    },
    handleAccessoryFaceSelection(face) {
      this.avatarPreview.face = face
      this.avatarPreview.accessory = {
        id: face.accessoryId || face.accessory_id || face.id,
        name:
          face.accessory?.name ||
          face.accessoryName ||
          face.name ||
          'Accessoire',
      }
      this.saveAvatarModel()
    },
    handleEyeBrowSelection(eyebrow) {
      this.avatarPreview.eyebrow = eyebrow
      this.saveAvatarModel()
    },
    handleEyeBrowColorSelection(eyebrowcolor) {
      this.avatarPreview.eyebrowcolor = eyebrowcolor
      this.saveAvatarModel()
    },
    async handleSkinColorSelection(skincolor) {
      const selectionId = ++this.skinColorSelectionId
      const currentMorphology = this.avatarPreview.morphology
      const currentMorphotype = this.avatarPreview.morphotype
      const currentBody = this.avatarPreview.body
      const hasCurrentMorphology = Boolean(
        currentMorphology?.id || currentMorphology?.name
      )

      this.avatarPreview.skincolor = skincolor

      const [morphologiesResult, nosesResult, facesResult] =
        await Promise.allSettled([
          this.avatarCatalogStore.fetchMorphologiesBySkinColorId(skincolor.id),
          this.avatarCatalogStore.fetchNosesBySkinColorId(skincolor.id),
          this.avatarCatalogStore.fetchFacesBySkinColorId(skincolor.id),
        ])

      if (selectionId !== this.skinColorSelectionId) return

      const findEquivalentOrFirst = (items, currentItem) =>
        items.find((item) => item.name === currentItem?.name) || items[0] || null

      if (morphologiesResult.status === 'fulfilled') {
        const compatibleMorphology = currentMorphology?.id
          ? morphologiesResult.value.find(
              (morphology) =>
                morphology.id === currentMorphology.id ||
                morphology.name === currentMorphology.name
            ) || null
          : null
        const fallbackMorphology =
          morphologiesResult.value.find(
            (morphology) => morphology.name === '8'
          ) ||
          morphologiesResult.value[0] ||
          null

        this.avatarPreview.morphology =
          hasCurrentMorphology ? compatibleMorphology : fallbackMorphology

        if (this.avatarPreview.morphology) {
          try {
            const morphotypes =
              await this.avatarCatalogStore.fetchMorphotypesBySkinColorAndMorphology(
                skincolor.id,
                this.avatarPreview.morphology.id
              )

            if (selectionId !== this.skinColorSelectionId) return

            this.avatarPreview.morphotype = currentMorphotype
              ? morphotypes.find(
                  (morphotype) =>
                    morphotype.name === currentMorphotype.name ||
                    morphotype.size === currentMorphotype.size
                ) || null
              : morphotypes.find((morphotype) => morphotype.size === 'S') ||
                morphotypes[0] ||
                null

            if (this.avatarPreview.morphotype?.image) {
              this.avatarPreview.body = { ...this.avatarPreview.morphotype }
            }
          } catch (error) {
            this.avatarCatalogStore.morphotypes = []
            this.avatarPreview.morphotype = null
            console.error(error)
          }
        } else {
          this.avatarCatalogStore.morphotypes = []
          this.avatarPreview.morphotype = null
        }
      } else {
        this.avatarCatalogStore.morphologies = []
        this.avatarCatalogStore.morphotypes = []
        this.avatarPreview.morphology = null
        this.avatarPreview.morphotype = null
      }

      if (this.avatarPreview.morphotype) {
        await this.fetchAndSelectBody(
          skincolor,
          this.avatarPreview.morphotype,
          currentBody
        )

        if (selectionId !== this.skinColorSelectionId) return
      } else {
        this.avatarCatalogStore.bodies = []
        this.avatarPreview.body = null
      }

      if (nosesResult.status === 'fulfilled') {
        this.avatarPreview.nose = findEquivalentOrFirst(
          nosesResult.value,
          this.avatarPreview.nose
        )
      }

      if (facesResult.status === 'fulfilled') {
        this.avatarPreview.face = findEquivalentOrFirst(
          facesResult.value,
          this.avatarPreview.face
        )
      }

      try {
        if (
          this.avatarPreview.avatarClothing &&
          this.avatarPreview.morphotype &&
          Array.isArray(this.avatarPreview.selectedClothing)
        ) {
          const topClothing = this.avatarPreview.selectedClothing.find(
            (item) => item.type === 'Haut'
          )
          const bottomClothing = this.avatarPreview.selectedClothing.find(
            (item) => item.type === 'Bas'
          )
          const outfitClothing = this.avatarPreview.selectedClothing.find(
            (item) => item.type === 'Ensemble'
          )
          // await this.fetchAvatarClothingByMorphotype(topClothing, bottomClothing, outfitClothing, morphotype )
          await this.fetchAvatarClothingByMorphotype(
            topClothing,
            bottomClothing,
            outfitClothing,
            this.avatarPreview.morphotype
          )
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(
          "Une erreur s'est produite lors de l'actualisation du vêtement :",
          err
        )
      }

      this.saveAvatarModel()
    },
    async fetchAndSelectBody(skincolor, morphotype, currentBody = null) {
      this.avatarCatalogStore.bodies = []

      if (
        !skincolor?.id ||
        !this.avatarPreview.morphology?.id ||
        !morphotype?.id
      ) {
        this.avatarPreview.body = null
        return null
      }

      try {
        let bodies = this.avatarPreview.clothingSlug
          ? await this.avatarCatalogStore.fetchBodiesByClothingSlug(
              this.avatarPreview.clothingSlug
            )
          : await this.avatarCatalogStore.fetchBodiesByAvatarAttributes(
              skincolor.id,
              this.avatarPreview.morphology?.id,
              morphotype.id
            )

        const normalizeCriterion = (value) =>
          String(value || '').trim().toLowerCase().replace(/-/g, '_')
        const matchingClothedBody = this.avatarPreview.clothingSlug
          ? bodies.find(
              (body) =>
                Number(body.skinColorId) === Number(skincolor.id) &&
                Number(body.morphologyId) ===
                  Number(this.avatarPreview.morphology?.id) &&
                Number(body.morphotypeId) === Number(morphotype.id)
            ) ||
            bodies.find(
              (body) =>
                normalizeCriterion(body.skinColor) ===
                  normalizeCriterion(skincolor.name) &&
                normalizeCriterion(body.morphology) ===
                  normalizeCriterion(this.avatarPreview.morphology?.name) &&
                (normalizeCriterion(body.morphotype) ===
                  normalizeCriterion(morphotype.name) ||
                  normalizeCriterion(body.size) ===
                    normalizeCriterion(morphotype.size))
            )
          : null

        if (this.avatarPreview.clothingSlug && !matchingClothedBody) {
          bodies = await this.avatarCatalogStore.fetchBodiesByAvatarAttributes(
            skincolor.id,
            this.avatarPreview.morphology?.id,
            morphotype.id
          )
        }

        this.avatarPreview.body = this.avatarPreview.clothingSlug
          ? matchingClothedBody || bodies[0] || null
          : bodies.find((body) => body.name === currentBody?.name) ||
            bodies[0] ||
            null

        return this.avatarPreview.body
      } catch (error) {
        this.avatarPreview.body = null
        console.error(error)
        return null
      }
    },
    handleHairColorSelection(haircolor) {
      this.avatarPreview.haircolor = haircolor
      this.saveAvatarModel()
    },
    handleEyeColorSelection(eyecolor) {
      this.avatarPreview.eyecolor = eyecolor
      this.saveAvatarModel()
    },
    async handleMorphologySelection(morphology) {
      const currentBody = this.avatarPreview.body
      this.avatarPreview.morphology = morphology

      if (this.avatarPreview.morphotype) {
        const currentMorphotype = this.avatarPreview.morphotype
        const morphotypes = this.avatarCatalogStore.morphotypes

        this.avatarPreview.morphotype =
          morphotypes.find(
            (morphotype) =>
              morphotype.name === currentMorphotype.name ||
              morphotype.size === currentMorphotype.size
          ) ||
          morphotypes.find((morphotype) => morphotype.size === 'S') ||
          morphotypes[0] ||
          null
      }

      if (this.avatarPreview.morphotype) {
        await this.fetchAndSelectBody(
          this.avatarPreview.skincolor,
          this.avatarPreview.morphotype,
          currentBody
        )
      } else {
        this.avatarCatalogStore.bodies = []
        this.avatarPreview.body = null
      }

      if (
        this.avatarPreview.morphotype &&
        this.avatarPreview.selectedClothing &&
        this.avatarPreview.avatarClothing
      ) {
        // this.avatarPreview.selectedClothing = null
        // this.avatarPreview.avatarClothing = null
        const topClothing = this.avatarPreview.selectedClothing.find(
          (item) => item.type === 'Haut'
        )
        const bottomClothing = this.avatarPreview.selectedClothing.find(
          (item) => item.type === 'Bas'
        )
        const outfitClothing = this.avatarPreview.selectedClothing.find(
          (item) => item.type === 'Ensemble'
        )
        await this.fetchAvatarClothingByMorphotype(
          topClothing,
          bottomClothing,
          outfitClothing,
          this.avatarPreview.morphotype
        )
      }

      // this.avatarPreview.morphology = morphology
      this.saveAvatarModel()
    },
    async handleMorphotypeSelection(morphotype) {
      try {
        await this.fetchAndSelectBody(
          this.avatarPreview.skincolor,
          morphotype,
          this.avatarPreview.body
        )

        if (this.avatarPreview.avatarClothing) {
          const topClothing = this.avatarPreview.selectedClothing.find(
            (item) => item.type === 'Haut'
          )
          const bottomClothing = this.avatarPreview.selectedClothing.find(
            (item) => item.type === 'Bas'
          )
          const outfitClothing = this.avatarPreview.selectedClothing.find(
            (item) => item.type === 'Ensemble'
          )
          await this.fetchAvatarClothingByMorphotype(
            topClothing,
            bottomClothing,
            outfitClothing,
            morphotype
          )
        }

        this.avatarPreview.morphotype = morphotype
        this.saveAvatarModel()
      } catch (err) {
        console.error(err)
      }
    },

    handleClothingSelection(clothing) {
      if (
        !this.avatarPreview.selectedClothing ||
        (this.avatarPreview.selectedClothing &&
          this.avatarPreview.selectedClothing.length === 0)
      ) {
        // Si aucun vêtement n'est sélectionné, créez un tableau et ajoutez le vêtement à ajouter.
        this.avatarPreview.selectedClothing = [clothing]
      } else {
        const existingClothing = this.avatarPreview.selectedClothing.find(
          (item) => item.id === clothing.id
        )
        if (existingClothing) {
          // Si le vêtement à ajouter a la même ID qu'un vêtement déjà sélectionné, retirez-le.
          this.avatarPreview.selectedClothing =
            this.avatarPreview.selectedClothing.filter(
              (item) => item.id !== clothing.id
            )
        } else {
          if (clothing.type === 'Ensemble') {
            // Si le vêtement à ajouter est un outfit, supprimez tous les vêtements existants.
            this.avatarPreview.selectedClothing = [clothing]
          } else {
            const existingOutfit = this.avatarPreview.selectedClothing.find(
              (item) => item.type === 'Ensemble'
            )
            if (existingOutfit) {
              // Si un outfit est déjà sélectionné, supprimez tous les vêtements et ajoutez le nouvel outfit.
              this.avatarPreview.selectedClothing = [clothing]
            } else {
              // Vérifiez si le type du vêtement à ajouter est 'top' ou 'bottom'.
              if (clothing.type === 'Haut' || clothing.type === 'Bas') {
                // Si un vêtement de type 'top' ou 'bottom' est déjà sélectionné, remplacez-le par le nouveau vêtement.
                const existingSameTypeClothing =
                  this.avatarPreview.selectedClothing.find(
                    (item) => item.type === clothing.type
                  )
                if (existingSameTypeClothing) {
                  this.avatarPreview.selectedClothing =
                    this.avatarPreview.selectedClothing.filter(
                      (item) => item.type !== clothing.type
                    )
                }
              }

              // Ajoutez le nouveau vêtement à la sélection.
              this.avatarPreview.selectedClothing.push(clothing)
            }
          }
        }
      }

      // Appeler fetchAvatarClothingByMorphotype avec les vêtements sélectionnés.
      const topClothing = this.avatarPreview.selectedClothing.find(
        (item) => item.type === 'Haut'
      )
      const bottomClothing = this.avatarPreview.selectedClothing.find(
        (item) => item.type === 'Bas'
      )
      const outfitClothing = this.avatarPreview.selectedClothing.find(
        (item) => item.type === 'Ensemble'
      )

      this.fetchAvatarClothingByMorphotype(
        topClothing,
        bottomClothing,
        outfitClothing,
        this.avatarPreview.morphotype
      )
    },

    async handleFetchNosesWhileColorChanging(nose, skincolor) {
      try {
        const noses = await this.avatarCatalogStore.fetchNosesBySkinColorId(
          skincolor.id
        )

        const foundNose = noses.find((el) => {
          if (nose) {
            return (
              el.skincolor_id === skincolor.id &&
              el.nose_variant === nose.nose_variant
            )
          } else {
            return (
              el.skincolor_id === skincolor.id && el.nose_variant === 'Forme1-4'
            )
          }
        })

        if (foundNose) {
          this.avatarPreview.nose = foundNose
        } else {
          // throw new Error("La forme de nez de cette couleur n'existe pas.")
          this.avatarPreview.nose = noses[0]
        }
      } catch (err) {
        throw new Error(err)
      }
    },

    async handleFetchFacesWhileColorChanging(face, skincolor) {
      try {
        const faces = await this.avatarCatalogStore.fetchFacesBySkinColorId(
          skincolor.id,
          this.avatarPreview.accessory?.id || null
        )

        const foundFace = faces.find((el) => {
          if (face) {
            return (
              el.skincolor_id === skincolor.id &&
              el.face_variant === face.face_variant &&
              el.accessory_id === (this.avatarPreview.accessory?.id || null)
            )
          } else {
            return (
              el.skincolor_id === skincolor.id &&
              el.face_variant === 'Ovale 2' &&
              el.accessory_id === (this.avatarPreview.accessory?.id || null)
            )
          }
        })

        if (foundFace) {
          this.avatarPreview.face = foundFace
        } else {
          this.avatarPreview.face = faces[0]

          // throw new Error("La forme de visage de cette couleur n'existe pas")
        }
      } catch (err) {
        throw new Error(err)
      }
    },

    async fetchAvatarClothingByMorphotype(
      topClothing,
      bottomClothing,
      outfitClothing,
      morphotype
    ) {
      try {
        const body = {
          topColorVariant:
            topClothing !== null ? JSON.stringify(topClothing) : null,
          bottomColorVariant:
            bottomClothing !== null ? JSON.stringify(bottomClothing) : null,
          outfitColorVariant:
            outfitClothing !== null ? JSON.stringify(outfitClothing) : null,
          morphotypeId: morphotype.id,
        }

        const data =
          await this.avatarCatalogStore.fetchAvatarClothingByAttributes(body)
        if (data.avatarClothing.length === 1) {
          this.avatarPreview.avatarClothing = data.avatarClothing[0]
          this.saveAvatarModel()
        } else if (data.avatarClothing.length > 1) {
          this.avatarPreview.avatarClothing = null
          this.saveAvatarModel()
        } else {
          throw new Error(
            'Pas de vêtement correspondant avec ce vêtement et ce morphotype'
          )
        }
      } catch (err) {
        throw new Error(err)
      }
    },

    handleDeleteAvatarClothing(clothing) {
      const newClothesId = this.clothesId.filter((el) => el !== clothing.id)
      if (newClothesId.length !== this.clothesId.length) {
        this.avatarPreview.selectedClothing =
          this.avatarPreview.selectedClothing.filter(
            (item) => item.id !== clothing.id
          )
        this.clothesId = newClothesId
        this.saveAvatarModel()
      }
    },
    async handleRemoveClothing() {
      this.avatarPreview.clothingSlug = null
      this.avatarPreview.avatarClothing = null
      this.avatarPreview.selectedClothing = null

      await this.fetchAndSelectBody(
        this.avatarPreview.skincolor,
        this.avatarPreview.morphotype
      )
      this.saveAvatarModel()
    },
  },
}
</script>
