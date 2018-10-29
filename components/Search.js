import React ,{Component} from 'react';


export class Search extends React.Component {
    
    render(){


   const  styleCard={


    borderStyle: 'ridge',
    borderWidth: 'thin',
    
    
    
    }

        return(
        <div>
          <div style={styleCard} className="row">
          <div className="card">
 
  <div className="col-md-4">
  <label htmlFor="filter">Filter by School: </label>
        <input type="text" id="filter" 
          />
  </div><br />
</div>
          </div>
            </div>
        );}
}

export default Search;