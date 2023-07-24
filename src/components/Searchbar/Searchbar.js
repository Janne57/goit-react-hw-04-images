import { useState } from 'react';
import css from '../Searchbar/Searchbar.module.css'
import Notiflix from 'notiflix';

const Searchbar = ({ onSubmit} ) => {
 
 const [query, setQuery] = useState('');


 const handleChange = evt => {
    setQuery(evt.currentTarget.value);
  };


  const handleSubmit = evt => {
    evt.preventDefault();

    if (query.trim() === '') {
      Notiflix.Notify.failure ('Please, enter correct query');
      return;
    }
    setQuery(evt.currentTarget.value)
    onSubmit(query.trim()); //вызываем имя пропса, кот.передаётся из onSubmit, в кот-м лежит  ссылка на метод handleFormSubmit
    setQuery('');
  };

  

    return (
      <header className={css.searchbar}>
        <form className="form" onSubmit={handleSubmit}>
          <button type="submit" className={css.button}>
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            value={query}
            onChange={handleChange}
          />
        </form>
      </header>
    );
  
}

export default Searchbar;








// import { Component } from 'react';
// import css from '../Searchbar/Searchbar.module.css'
// import Notiflix from 'notiflix';

// export default class Searchbar extends Component {
//   state = {
//     query: '',
//   };


//   handleChange = evt => {
//     this.setState({ query: evt.currentTarget.value });
//   };


//   handleSubmit = evt => {
//     evt.preventDefault();

//     if (this.state.query.trim() === '') {
//       Notiflix.Notify.failure ('Please, enter correct query');
//       return;
//     }

//     this.props.onSubmit(this.state.query.trim()); //вызываем имя пропса, кот.передаётся из onSubmit, в кот-м лежит  ссылка на метод handleFormSubmit
//     this.setState({ query: '' });
//   };

  
//   render() {
//     return (
//       <header className={css.searchbar}>
//         <form className="form" onSubmit={this.handleSubmit}>
//           <button type="submit" className={css.button}>
//             <span className="button-label">Search</span>
//           </button>

//           <input
//             className="input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             name="query"
//             value={this.state.query}
//             onChange={this.handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
