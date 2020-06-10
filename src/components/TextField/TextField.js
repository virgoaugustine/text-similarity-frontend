import React from 'react';
import './TextField.css';

const TextField = ({ field, textInput }) => {

    return (
<article className="pa4 black-80 mw6 center">
  <div>
    <label className="f6 b db mb2 tc">{`Text ${field}`}</label>
    <textarea id="comment" name={`text${field}`} 
    onChange={textInput} className="db border-box hover-black w-100 measure ba b--black-20 pa1 br2 mb2" aria-describedby="comment-desc"></textarea>
  </div>
</article>
    )

}

export default TextField;