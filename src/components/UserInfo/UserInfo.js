import React from 'react';
import './UserInfo.css';

const UserInfo = ({user, tokens}) => {
    if (tokens > 0)
    {
        return (
        <div>
            <div className="white f3">
                {`Hello ${user}, you currently have `} 
                <span className="white f1">{tokens}</span>
                {tokens > 1 ? ` tokens.` : ` token.`}
            </div>
        
        </div>
        )
    } else {
        return (
            <div>
                <div className="white f3">
                    {`Hello ${user}, you currently have `} 
                    <span className="white f1">0</span>
                    {` tokens. Please contact the admin to buy more.`}
                </div>
            
            </div>
            )
    }
}

export default UserInfo;