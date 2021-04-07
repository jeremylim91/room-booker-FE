import React from 'react';
import moment from 'moment';

export const MyToolbar = (toolbar) => {
  // const goToBack = () => {
  //   toolbar.date.setMonth(toolbar.date.getMonth() - 1);
  //   toolbar.onNavigate('prev');
  // };

  // const goToNext = () => {
  //   toolbar.date.setMonth(toolbar.date.getMonth() + 1);
  //   toolbar.onNavigate('next');
  // };

  // const goToCurrent = () => {
  //   const now = new Date();
  //   toolbar.date.setMonth(now.getMonth());
  //   toolbar.date.setYear(now.getFullYear());
  //   toolbar.onNavigate('current');
  // };

  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };
  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };
  const goToCurrent = () => {
    toolbar.onNavigate('TODAY');
  };

  const label = () => {
    const date = moment(toolbar.date);
    return (
      <span>
        <b>{date.format('MMMM')}</b>
        <span> {date.format('YYYY')}</span>
      </span>
    );
  };

  // return (
  //   <div className={sCalendar['toolbar-container']}>
  //     <label className={sCalendar['label-date']}>{label()}</label>

  //     <div className={sCalendar['back-next-buttons']}>
  //       <button className={sCalendar['btn-back']} onClick={goToBack}>
  //         &#8249;
  //       </button>
  //       <button className={sCalendar['btn-current']} onClick={goToCurrent}>
  //         today
  //       </button>
  //       <button className={sCalendar['btn-next']} onClick={goToNext}>
  //         &#8250;
  //       </button>
  //     </div>
  //   </div>
  // );

  const goToToday = () => {
    const now = new Date();
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setYear(now.getFullYear());
    toolbar.onNavigate('current');
  };

  const goToBackYear = () => {
    let mDate = toolbar.date;
    let newDate = new Date(mDate.getFullYear() - 1, 1);
    toolbar.onNavigate('prev', newDate);
  };

  const goToNextYear = () => {
    let mDate = toolbar.date;
    let newDate = new Date(mDate.getFullYear() + 1, 1);
    toolbar.onNavigate('next', newDate);
  };

  const month = () => {
    const date = moment(toolbar.date);
    let month = date.format('MMMM');

    return <span className="rbc-toolbar-label">{month}</span>;
  };
  const year = () => {
    const date = moment(toolbar.date);
    let year = date.format('YYYY');

    return (
      <span className="rbc-btn-group">
        {this.state.viewState === 'month' && (
          <button type="button" onClick={goToBackYear}>
            <span className="prev-icon">&#8249;&#8249;</span>
          </button>
        )}
        <span className="rbc-toolbar-label">{year}</span>
        {this.state.viewState === 'month' && (
          <button type="button" onClick={goToNextYear}>
            <span className="prev-icon">&#8250;&#8250;</span>
          </button>
        )}
      </span>
    );
  };
};
