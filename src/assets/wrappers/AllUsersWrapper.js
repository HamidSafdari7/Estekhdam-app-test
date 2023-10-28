import styled from 'styled-components'

const Wrapper = styled.section`

.form-row{
  width:200px;
}
  .modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 80px auto;
  padding: 20px;
  border: 1px solid #888;
  width: 450px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-infoes{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.edit-modal-infoes{
    display: flex;
    flex-direction: column;
    align-items: center;
    /* row-gap: 8px; */
    margin-top: 10px;
}

@media (max-width: 426px) {
    .modal-content{
        width:320px;
    }
  }

  .pagination {
  display: flex;
  column-gap: 8px;
  list-style: none;
  cursor: pointer;
}

.pagination a {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #6c7ac9;
  color: #6c7ac9;
}

.pagination__link {
  font-weight: bold;
}

.pagination__link--active a {
  color: #fff;
  background: #6c7ac9;
}

.pagination__link--disabled a {
  color: rgb(198, 197, 202);
  border: 1px solid rgb(198, 197, 202);
}

.btn-danger{
  margin-bottom:5px;
}
`
export default Wrapper
