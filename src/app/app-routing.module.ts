import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'daftar',
    loadChildren: () => import('./daftar/daftar.module').then( m => m.DaftarPageModule)
  },
  {
    path: 'slide',
    loadChildren: () => import('./slide/slide.module').then( m => m.SlidePageModule)
  },
  {
    path: 'lupa',
    loadChildren: () => import('./lupa/lupa.module').then( m => m.LupaPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'advokat',
    loadChildren: () => import('./advokat/advokat.module').then( m => m.AdvokatPageModule)
  },
  {
    path: 'artikel',
    loadChildren: () => import('./artikel/artikel.module').then( m => m.ArtikelPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'berita',
    loadChildren: () => import('./berita/berita.module').then( m => m.BeritaPageModule)
  },
  {
    path: 'chatmsg',
    loadChildren: () => import('./chatmsg/chatmsg.module').then( m => m.ChatmsgPageModule)
  },
  {
    path: 'datadiri',
    loadChildren: () => import('./datadiri/datadiri.module').then( m => m.DatadiriPageModule)
  },
  {
    path: 'datatransaksi',
    loadChildren: () => import('./datatransaksi/datatransaksi.module').then( m => m.DatatransaksiPageModule)
  },
  {
    path: 'kontakkami',
    loadChildren: () => import('./kontakkami/kontakkami.module').then( m => m.KontakkamiPageModule)
  },
  {
    path: 'livechat',
    loadChildren: () => import('./livechat/livechat.module').then( m => m.LivechatPageModule)
  },
  {
    path: 'payment-detail',
    loadChildren: () => import('./payment-detail/payment-detail.module').then( m => m.PaymentDetailPageModule)
  },
  {
    path: 'pengaturan',
    loadChildren: () => import('./pengaturan/pengaturan.module').then( m => m.PengaturanPageModule)
  },
  {
    path: 'profil-advokat',
    loadChildren: () => import('./profil-advokat/profil-advokat.module').then( m => m.ProfilAdvokatPageModule)
  },
  {
    path: 'rating',
    loadChildren: () => import('./rating/rating.module').then( m => m.RatingPageModule)
  },
  {
    path: 'riwayattransaksi',
    loadChildren: () => import('./riwayattransaksi/riwayattransaksi.module').then( m => m.RiwayattransaksiPageModule)
  },
  {
    path: 'syarat',
    loadChildren: () => import('./syarat/syarat.module').then( m => m.SyaratPageModule)
  },
  {
    path: 'tentangkami',
    loadChildren: () => import('./tentangkami/tentangkami.module').then( m => m.TentangkamiPageModule)
  },
  {
    path: 'ubahdatadiri',
    loadChildren: () => import('./ubahdatadiri/ubahdatadiri.module').then( m => m.UbahdatadiriPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
