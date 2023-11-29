import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, getAuth, onAuthStateChanged } from "firebase/auth";
import authConfig from "../Firebase/firebase.config";
import useAxiosPublic from "../pages/Dashboard/AllUsers/useAxiosPublic";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const auth = getAuth(authConfig);  // Initialize auth here
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const axiosPublic = useAxiosPublic();

    const createUser = (email, password, displayName, photoURL) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // After user is created, update their profile
                const user = userCredential.user;
                return updateProfile(user, {
                    displayName: displayName,
                    photoURL: photoURL
                }).then(() => {
                    setUser(user);
                    return user;
                });
            });
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    //on reload user doesn't gets disconnected
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                //
                const userInfo = {email: currentUser.email};
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })
            }
            else{
                   localStorage.removeItem   ('access-token')       
            }
            //console.log('observing current user', currentUser)
            setLoading(false);
        })

        return () => {
            unSubscribe();
        }

    }, [axiosPublic])

    const authInfo = { user, loading, createUser, signInUser, logOut, signInWithGoogle }


    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>

        </div>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}