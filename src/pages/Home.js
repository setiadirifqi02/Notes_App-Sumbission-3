import React from "react";
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import { FiPlusCircle } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { getActiveNotes } from '../utils/data';

function HomePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    function changeSearchParams(keyword) {
        setSearchParams({ keyword });
    }

    return <Home defaultKeyword={keyword} keywordChange={changeSearchParams} />
}

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            keyword: props.defaultKeyword || '',
        }

        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    async componentDidMount() {
        const { data } = await getActiveNotes();
        
        this.setState(() => {
          return {
            notes: data
          }
        })
      }

    onKeywordChangeHandler(keyword) {
        this.setState(() => {
            return {
                keyword,
            }
        });

        this.props.keywordChange(keyword);
    }

    render() {
        const notes = this.state.notes.filter((note) => {
            return note.title.toLowerCase().includes(
                this.state.keyword.toLowerCase()
            );
        });

        return (
            <div className="homepage">
                <h2>Catatan Aktif</h2>

                <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
                <section className="note-list">
                    <NoteList notes={notes}  />
                </section>
                <section className="homepage__action">
                    <Link to="/add"><button><FiPlusCircle /></button></Link>
                </section>
            </div>
        )

    }
}

Home.propsType = {
    keywordChange : PropTypes.func.isRequired,
    defaultKeyword : PropTypes.string.isRequired,

}

export default HomePageWrapper;