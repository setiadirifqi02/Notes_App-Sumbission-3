import React from "react";
import PropTypes from 'prop-types';
import NoteItemBody from "./NoteItemBody";
import { showFormattedDate } from "../utils/index";

function NoteItem({ title, body, createdAt, id }) {
  return (
    <div className="note-item">
      <NoteItemBody id={id} title={title} body={body} createdAt={showFormattedDate(createdAt)} />
    </div>
  );
}

NoteItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default NoteItem;