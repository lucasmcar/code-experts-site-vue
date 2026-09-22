import { RuntimeConfig as UserRuntimeConfig, PublicRuntimeConfig as UserPublicRuntimeConfig } from 'nuxt/schema'
  interface SharedRuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   recaptchaSecretKey: string,

   supabaseServiceRoleKey: string,

   firebaseClientEmail: string,

   firebasePrivateKey: string,

   firebaseProjectId: string,

   supabase: {
      serviceKey: any,
   },
  }
  interface SharedPublicRuntimeConfig {
   siteUrl: string,

   supabaseUrl: string,

   supabaseKey: string,

   recaptchaSiteKey: string,

   metaPixelId: string,

   firebaseVapidKey: string,

   supabase: {
      url: any,

      key: any,

      redirect: boolean,

      redirectOptions: {
         login: string,

         callback: string,

         exclude: Array<any>,

         cookieRedirect: boolean,

         saveRedirectToCookie: boolean,

         include: Array<string>,
      },

      cookieName: string,

      cookiePrefix: any,

      useSsrCookies: boolean,

      cookieOptions: {
         maxAge: number,

         sameSite: string,

         secure: boolean,
      },

      clientOptions: any,
   },
  }
declare module '@nuxt/schema' {
  interface RuntimeConfig extends UserRuntimeConfig {}
  interface PublicRuntimeConfig extends UserPublicRuntimeConfig {}
}
declare module 'nuxt/schema' {
  interface RuntimeConfig extends SharedRuntimeConfig {}
  interface PublicRuntimeConfig extends SharedPublicRuntimeConfig {}
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: UserRuntimeConfig
        }
      }