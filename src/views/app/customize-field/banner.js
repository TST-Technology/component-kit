import AlertPopup from 'components/alert-popup';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import React, { useEffect, useState } from 'react';
import { Button, CardBody, Row } from 'reactstrap';
import { addPoster, deletePoster, getPoster } from 'utils/API/api';
import CONSTANTS from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';

export default function Banner() {
  const [loaded, setLoaded] = useState(false);
  const [posters, setPosters] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [currentPoster, setCurrentPoster] = useState({});
  const [isModelOpen, setIsModelOpen] = useState(false);
  const addNewPoster = (e) => {
    setLoaded(true);
    (async () => {
      if (e.target.files[0] !== null) {
        const payload = new FormData();
        payload.append('image', e.target.files[0]);
        const res = await addPoster(payload);
        if (res !== -1) {
          setRefresh((previous) => !previous);
        } else {
          setLoaded(false);
        }
      } else {
        setLoaded(false);
      }
    })();
  };

  const deletePPosterHandler = () => {
    setLoaded(true);
    setIsModelOpen(false);
    (async () => {
      const res = await deletePoster(currentPoster.id);
      if (res !== -1) {
        setRefresh((previous) => !previous);
      } else {
        setLoaded(false);
      }
    })();
  };

  const deletePopup = (poster) => {
    setCurrentPoster(poster);
    setIsModelOpen(true);
  };

  useEffect(() => {
    (async () => {
      setLoaded(true);
      const res = await getPoster();
      if (res !== -1) {

        setPosters(
          res?.data?.data?.data.reverse().map((poster, index) => {
            return {
              ...poster,
              no: index + 1,
              action: [() => deletePopup(poster), false],
            };
          })
        );
      }
      setLoaded(false);
    })();
  }, [refresh]);


  return (
    <>
      <Row className="survey-app">
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>Poster</h1>
            {!loaded && (
              <div className="text-zero top-right-button-container">
                <Button color="primary" size="lg" className="top-right-button">
                  <input
                    type="file"
                    style={{
                      position: 'absolute',
                      marginLeft: '-41px',
                      cursor: 'pointer',
                      width: '151px',
                      height: '41px',
                      marginTop: '-10px',
                      background: '#000',
                      borderRadius: '60px',
                      opacity: '0',
                    }}
                    onChange={addNewPoster}
                  />
                  <IntlMessages id="promocode.add-new" />
                </Button>
              </div>
            )}
          </div>

          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
            >
              <IntlMessages id="promocode.display-options" />{' '}
              <i className="simple-icon-arrow-down align-middle" />
            </Button>
          </div>
          <Separator className="mb-5" />
          <Row>
            <Colxx sm="12">
              <CardBody>
                {!loaded ? (
                  <ViewTable
                    headers={CONSTANTS.TABLE_HEADER.BANNER}
                    items={posters}
                    advisorId={CONSTANTS.TABLE_ID.poster}
                    filterParams="no"
                  />
                ) : (
                  <div className="loading" />
                )}
              </CardBody>
            </Colxx>
          </Row>
        </Colxx>
      </Row>

      <AlertPopup
        isOpen={isModelOpen}
        toggleModal={() => setIsModelOpen((previous) => !previous)}
        onPositive={deletePPosterHandler}
        onNegative={() => setIsModelOpen((previous) => !previous)}
        positiveText="Agree"
        negativeText="cancel"
        warning="Aar you sure want to delete the poster ?"
      />
    </>
  );
}
