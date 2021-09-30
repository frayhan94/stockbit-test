import './modal.css';

function Index({img, onClose}) {
    return (
        <div className={'Modal'} data-testid="modal-wrapper">
            <div>
                <img src={img} alt={'modal_img'} />
            </div>
            <div>
                  <span
                      style={{
                          cursor:"pointer"
                      }}
                      onClick={() => {
                          onClose();
                      }}
                  >
                    Close
                </span>
            </div>
        </div>
    )
}


export default Index;
