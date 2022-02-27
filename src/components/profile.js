import { faArrowLeft, faCaretRight } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function handleClick(){
    console.log("account detail clicked");

    document.getElementById("accinfo").style.display = "block";

    
}

const ProfilePage = user => {
    console.log("Profile page clicked");
    console.log("user is " + user.username);

   
    return (
        <div>
            <div id="accheader">
                <FontAwesomeIcon icon={faArrowLeft} className="back" 
                    onClick={()=> document.getElementById("ppage").style.display = "none"}/>
                <p>Account details</p>
            </div>
            <div id="accphoto">
                <p>Profile Photo</p>
                <img src={user.userphoto}></img>
            </div>
            <div id="accdetails">

                <div className="accinfo" onClick={ () => handleClick()}>
                    <div className="eachDetail">
                        <p>Name</p>
                        <p>{user.username}</p>
                    </div>
                    
                    <FontAwesomeIcon icon={faCaretRight} className="carats"/>
                </div>
                <div className="accinfo" onClick={ () => handleClick()}>
                    <div className="eachDetail">
                        <p>Email</p>
                        <p>{user.useremail}</p>
                    </div>
                    
                    <FontAwesomeIcon icon={faCaretRight} className="carats"/>

                </div>
                <div className="accinfo" onClick={ () => handleClick()}>
                    <div className="eachDetail">
                        <p>Pet's Name</p>
                        <p>pet is {user.username}</p>
                    </div>

                    <FontAwesomeIcon icon={faCaretRight} className="carats" />

                </div>
                <div className="accinfo" onClick={ () => handleClick()}>
                    <div className="eachDetail"> 
                        <p>Home Address</p>
                        <p>home address is {user.username}</p>
                    </div>

                    <FontAwesomeIcon icon={faCaretRight} className="carats"/>

                </div>
                <div className="accinfo" onClick={ () => handleClick()}>
                    <div className="eachDetail"> 
                        <p>Payment</p>
                        <p>payment is {user.username}</p>
                    </div>

                    <FontAwesomeIcon icon={faCaretRight} className="carats" />

                </div>
            </div>
        </div>
    );
    
}

export default ProfilePage;