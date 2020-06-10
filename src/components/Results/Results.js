import React from 'react';

const Results = ({ compare, similarity}) =>{
    return(
    <div>
        <div className="customCenter">
            <button className="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib navy"
            onClick={compare}>Compare</button>
        </div>
        <div className="br3 b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center tc pa4 bg-near-white">
        {similarity}
        </div>
    </div>
    )
}

export default Results;