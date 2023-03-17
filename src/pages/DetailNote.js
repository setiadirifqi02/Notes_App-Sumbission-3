import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import NoteDetail from "../components/NoteDetail";
import { getNote, deleteNote } from "../utils/data";
import PropTypes from 'prop-types';
import NoteItemAction from "../components/NoteItemAction";

function DetailNoteWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  return <DetailNote  id={id} navigate={navigate} />;

}

class DetailNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: [],
      // notes: deleteNote(props.id),
    }

    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {    
    this.setState(() => {
      return {
        note: getNote(this.props.id)
      }
    })
  }

  handleDelete = () => {
    deleteNote(this.props.id);
    this.props.navigate('/');
  };

  render() {
    // const { note } = this.state;

    if (this.state.note === null) {
      return <p>Catatan Tidak Ditemukan!</p>;
    }

    return (
      <section>
          <div>
            <NoteDetail {...this.state.note} />
            <div className="detail-page">
              <NoteItemAction onDelete={this.handleDelete} />
            </div>
          </div>
      </section>
    );
  }
}

DetailNote.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
}

export default DetailNoteWrapper;
