import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { register } from 'swiper/element';
import { PlanService } from '../../Services/PlanService';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FreeTrialService, FreeTrialResponse } from '../../Services/free-trial.service';


interface PricingPlan {
  id:number,
  title: string;
  discountText: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  planType: 'individual' | 'family' ;
}
register();
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HeroComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private planService: PlanService,
    private freeTrialService: FreeTrialService 
  ){}
  
  @ViewChild('swiper') swiperEl!: ElementRef;

  imageList: string[] = Array.from({ length: 50 }, (_, i) => `/swiper-movies/movie${i + 1}.jpg`);


  ngAfterViewInit(){
    this.initializeSwiper();
  }
  private initializeSwiper() {
    const swiperElement = this.swiperEl.nativeElement;
    const params = {
      slidesPerView: 4,
      speed: 2000,
      autoplay: {
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }
    };
      
      Object.assign(swiperElement, params);
      swiperElement.initialize();
    }
  
    movieImages: string[] = [];

    
    goToCheckout(selectedPlan: any) {
      this.planService.setSelectedPlan(selectedPlan);
      this.router.navigate(['/checkout']).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
      });
    }
    

  selectedPlanType: 'individual' | 'family'  = 'individual';

selectPlanType(type: 'individual' | 'family' ) {
  this.selectedPlanType = type;
}
  allPlans: PricingPlan[] = [
    // Individual Plans
      {
        id: 1,
        title: 'FORFAIT BASIQUE',
        discountText: 'Économisez 30 %',
        price: '69 €',
        duration: '/an',
        description: '(12 mois + 2 gratuits = 14 mois au total)',
        features: [
          'Accès instantané',
          'Serveur alimenté par IA',
          'Technologie anti-gel basée sur l’IA',
          '130 000+ chaînes en direct – Films, sports, émissions',
          'Streaming en 4K',
          'Guide des programmes (EPG)',
          'Fonction de rattrapage (Catch Up)',
          'Assistance 24h/24 et 7j/7',
          'Contenu adulte en option',
          'Garantie de remboursement sous 120 jours'
        ],
        ctaText: 'Rejoindre le forfait basique',
        planType: 'individual'
      },
      {
        id: 2,
        title: 'FORFAIT POPULAIRE',
        discountText: 'Économisez 41 %',
        price: '118 €',
        duration: '/2 ans',
        description: '(24 mois + 4 gratuits = 28 mois au total)',
        features: [
          'Accès instantané',
          'Serveur alimenté par IA',
          'Technologie anti-gel basée sur l’IA',
          '130 000+ chaînes en direct – Films, sports, émissions',
          'Streaming en 4K',
          'Guide des programmes (EPG)',
          'Fonction de rattrapage (Catch Up)',
          'Assistance 24h/24 et 7j/7',
          'Contenu adulte en option',
          'Garantie de remboursement sous 120 jours'
        ],
        isPopular: true,
        ctaText: 'Rejoindre le forfait populaire',
        planType: 'individual'
      },
      {
        id: 3,
        title: 'FORFAIT PREMIUM',
        discountText: 'Économisez 40 %',
        price: '169 €',
        duration: '/an',
        description: '(36 mois + 6 gratuits = 42 mois au total)',
        features: [
          'Toutes les fonctionnalités précédentes',
          'Support prioritaire',
          '42 mois pouvant être répartis sur 3 appareils différents simultanément',
          'Garantie de remboursement sous 120 jours'
        ],
        ctaText: 'Rejoindre le forfait premium',
        planType: 'family'
      },
      {
        id: 4,
        title: 'FORFAIT À VIE',
        discountText: 'Économisez 40 %',
        price: '289 €',
        duration: 'Paiement unique',
        description: '(Payez une seule fois – Plus jamais de renouvellement ou d’augmentation de prix)',
        features: [
          'Toutes les fonctionnalités précédentes',
          'Support prioritaire',
          'Utilisable sur 2 appareils différents mais pas simultanément',
          'Garantie de remboursement sous 120 jours'
        ],
        isPopular: true,
        ctaText: 'Rejoindre le forfait à vie',
        planType: 'family'
      }
  ];
  get plans() {
    return this.allPlans.filter(plan => plan.planType === this.selectedPlanType);
  }

  isOpen1 = false;
  isOpen2 = false; 
  isOpen3 = false; 
  isOpen4 = false; 
  isOpen5 = false; 
  isOpen6 = false; 
  isOpen7 = false; 
  isOpen8 = false; 
  isOpen9 = false; 
  isOpen10 = false; 
  isOpen11 = false; 
  isOpen12 = false; 
  isOpen13 = false; 
  isOpen14 = false; 
  isOpen15 = false; 
  isOpen16 = false; 

  
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const top = element.offsetTop - (window.innerHeight / 2) + (element.clientHeight / 2);
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
  }
}
form = {
  firstname: '',
  country:'',
  email: '',
  phone: '',
};
freeTrialData = {
  email: '',
  firstName: '',
  country:'',
  whatsappNumber: null as number | null // Initialize as null, allow number
};
isSubmittingTrial = false;
trialSubmissionStatus: 'success' | 'error' | 'pending' | 'none' = 'none';
trialResponseMessage: string = ''; // To hold success/error messages

 // --- Free Trial Method ---
 requestFreeTrial() {
  // Form validation is already handled by template, so we can proceed directly
  this.isSubmittingTrial = true;
  this.trialSubmissionStatus = 'pending';
  this.trialResponseMessage = '';

  const payload = {
    firstName: this.freeTrialData.firstName,
    email: this.freeTrialData.email,
    country: this.freeTrialData.country,
    whatsappNumber: this.freeTrialData.whatsappNumber ? 
                   Number(this.freeTrialData.whatsappNumber) : null
  };

  this.freeTrialService.requestTrial(payload).subscribe({
    next: (response: FreeTrialResponse) => {
      this.trialSubmissionStatus = 'success';
      this.trialResponseMessage = 'Success! Please check your email to verify your free trial.';
      // Reset form after success
      this.freeTrialData = { email: '', firstName: '', country:'', whatsappNumber: null };
      this.isSubmittingTrial = false;
    },
    error: (error: HttpErrorResponse) => {
      console.error('Registration error:', error);
      this.trialSubmissionStatus = 'error';
      this.isSubmittingTrial = false;
    
      // Check the actual error response body
      const errorBody = error.error;
      console.log('Error body:', errorBody);
    
      // Process the error message
      if (errorBody && errorBody.code) {
        switch (errorBody.code) {
          case 'EMAIL_EXISTS':
            this.trialResponseMessage = 'This email is already registered. Please use a different email.';
            break;
          case 'PHONE_EXISTS':
            this.trialResponseMessage = 'This WhatsApp number is already registered. Please use a different number.';
            break;
          default:
            this.trialResponseMessage = errorBody.message || 'Registration failed. Please try again.';
        }
      } else if (errorBody && errorBody.message) {
        // If there's a message but no code
        const errorMsg = errorBody.message.toLowerCase();
        if (errorMsg.includes('email')) {
          this.trialResponseMessage = 'This email is already registered. Please use a different email.';
        } else if (errorMsg.includes('whatsapp') || errorMsg.includes('number')) {
          this.trialResponseMessage = 'This WhatsApp number is already registered. Please use a different number.';
        } else {
          this.trialResponseMessage = errorBody.message;
        }
      } else {
        // Fallback error message
        this.trialResponseMessage = 'Registration failed. Please try again.';
      }
    }
  });
}

resetForm() {
  this.form = {
    firstname:'',
    country:'',
    email: '',
    phone: ''
  };
}


}
