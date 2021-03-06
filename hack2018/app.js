	"use strict";
if ( 'function' !== typeof Array.prototype.reduce ) {
  Array.prototype.reduce = function( callback /*, initialValue*/ ) {
    'use strict';
    if ( null === this || 'undefined' === typeof this ) {
      throw new TypeError(
         'Array.prototype.reduce called on null or undefined' );
    }
    if ( 'function' !== typeof callback ) {
      throw new TypeError( callback + ' is not a function' );
    }
    var t = Object( this ), len = t.length >>> 0, k = 0, value;
    if ( arguments.length >= 2 ) {
      value = arguments[1];
    } else {
      while ( k < len && ! k in t ) k++; 
      if ( k >= len )
        throw new TypeError('Reduce of empty array with no initial value');
      value = t[ k++ ];
    }
    for ( ; k < len ; k++ ) {
      if ( k in t ) {
         value = callback( value, t[k], k, t );
      }
    }
    return value;
  };
}

//screen.lockOrientation('landscape');
var authorizeNet = angular.module("authorizeNet",['ui.router','ngAnimate','ngGrid','ui.bootstrap','ui.mask','googlechart']);//,'invoices'
authorizeNet.config(function($stateProvider,$urlRouterProvider) {
	 $urlRouterProvider.otherwise("login");

	

	$stateProvider
		// route for the settings page
		.state('about', {
			url:"/about",
			templateUrl : 'view/about.html'
			//controller  : 'aboutController'
		})
		
		// route for the tools page
		.state('login',{
			url:"/login",
			templateUrl:'view/loginPage.html',
			
		})
		.state('createTransactionAccordian',{
			url:"/createTransactionAccordian",
			templateUrl:'view/virtualTerminal/createTransactionAccordian.html'
		})
		.state('createTransactionTabs',{
			url:"/createTransactionTabs",
			templateUrl:'view/virtualTerminal/createTransactionTabs.html'
		})
		.state('searchTransaction',{
			url:"/searchTransaction",
			templateUrl:'view/virtualTerminal/searchTransaction.html',
			controller:'searchController'
			
			
		})
		.state('mobileDeviceManagement',{
			url:"/mobileDeviceManagement",
			templateUrl:'view/settings/MobileDeviceManagementPage.html'
		})
		.state('branding',{
			url:"/branding",
			templateUrl:'view/settings/Branding.html'
		})
		.state('translate',{
			url:"/translate",
			templateUrl:'view/settings/Translate.html'
		})
		.state('mintSettings',{
			url:"/mintSettings",
			templateUrl:'view/settings.html'
		})
		.state('dashboard.transactionDetails',{
			url:"/details",
			templateUrl:'view/virtualTerminal/transactionDetails.html'
		})
		.state('dashboard',{
			abstract: true,
			templateUrl:'view/dashboard/dashboard.html',
			controller:'TransactionController'
		})
		.state('dashboard.transactionType',{
			url:"/dashboard.transactionType",
			templateUrl:'view/dashboard/transactionType.html'
		})
		.state('dashboard.transactionList',{
			url:"/transactionList",
			templateUrl:'view/dashboard/transactionList.html'
		})
		.state('makePayment',{
			abstract: true,
			templateUrl:'view/virtualTerminal/makePaymentBase.html',
			controller:'createTransactionController'
		})
		.state('makePayment.choosePayment',{
			url:"/makePayment.choosePayment",
			templateUrl:'view/virtualTerminal/choosePayment.html'
		})
		.state('makePayment.payByCard',{
			url:"/makePayment.payByCard",
			templateUrl:'view/virtualTerminal/payByCard.html'
		})
		.state('makePayment.createTransactionNext',{
			url:"/makePayment.createTransactionNext",
			templateUrl:'view/virtualTerminal/createTransactionNext.html'
		})
});



// Register AuthInterceptor.
authorizeNet.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});

authorizeNet.config(function($httpProvider) {

  $httpProvider.defaults.headers.post['Content-Type'] =  'text/xml';
    
  //  $http.defaults.useXDomain = true;
//	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});




