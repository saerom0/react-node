import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCPurJrKEd4mYQ5zcoxBHPQ2SosPs-2-EM',
	authDomain: 'projectsr-371500.firebaseapp.com',
	projectId: 'projectsr-371500',
	storageBucket: 'projectsr-371500.appspot.com',
	messagingSenderId: '1010512579942',
	appId: '1:1010512579942:web:a91839952ba6c8de5b0ca7',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
