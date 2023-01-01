export default function InputFilter({ searchTerm, onInputChange }) {
  return (
    <div className="form-row">
      <div className="col-md-6 col-lg-4 col-xl-3">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            name="search"
            value={searchTerm}
            placeholder="Filter weather terms"
            onChange={(e) => onInputChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}