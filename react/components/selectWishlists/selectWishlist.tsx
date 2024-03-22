/* eslint-disable react/jsx-handler-names */
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { SelectWishList } from '../../interfaces'

const CSS_HANDLES = [
  'containerSelect',
  'containerErrorAdd',
  'containerError',
  'containerButtonCloseBox',
  'containerSelectDiv',
  'containerSelectFlex',
  'containerMessageAddCreate',
  'containerShowForm',
  'containerButtonCreateList2',
  'containerSelectTitle',
  'containerButtonClose',
  'containerButtonCreateList',
  'containerInput',
  'containerTitleCreateList',
  'containerSelectDropdown',
  'containerButtonAddList',
  'containerButtonCreate',
] as const

const SelectWishlist = (props: SelectWishList) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <>
      {' '}
      {props.closeSlect && (
        <div className={`${handles.containerSelect}`}>
          <div className={`${handles.containerButtonCloseBox}`}>
            <button
              onClick={props.closeModal}
              className={`${handles.containerButtonClose}`}
            >
              X
            </button>
          </div>
          {props.listTypeWishlist?.length > 0 && (
            <div className={`${handles.containerSelectFlex}`}>
              {!props.clickCreate && (
                <>
                  <select
                    id="selectList"
                    style={{ marginBottom: '15px' }}
                    ref={props.selectRef}
                    className={`${handles.containerSelectDropdown}`}
                    onFocus={props.handleSelectFocus}
                    onBlur={props.handleSelectBlur}
                    onChange={props.captureValue}
                    size={props.selectSize}
                  >
                    <option value="" disabled selected>
                      Select List
                    </option>
                    {props.listTypeWishlist?.map((newDates: any) => (
                      <option
                        value={newDates.id}
                        key={newDates.id}
                        id={newDates.id}
                      >
                        {newDates.wishlistType}
                      </option>
                    ))}
                  </select>
                  <button
                    className={`${handles.containerButtonAddList}`}
                    onClick={props.addToList}
                  >
                    Add to list
                  </button>
                  {props.errorSelect && (
                    <p className={`${handles.containerError}`}>
                      {props.errorSelect}
                    </p>
                  )}
                  <button
                    className={`${handles.containerButtonCreate}`}
                    onClick={props.addList}
                  >
                    Create new list
                  </button>
                </>
              )}

              {props.isShowForm2 && (
                <div className={`${handles.containerShowForm}`}>
                  <p className={`${handles.containerTitleCreateList}`}>
                    Create a name for the list
                  </p>
                  <input
                    type="text"
                    placeholder="List name"
                    name="nameList"
                    value={props.nameListWishlist}
                    onChange={props.handleChange}
                    className={`${handles.containerInput}`}
                  />
                  {props.errorName && (
                    <p className={`${handles.containerErrorAdd}`}>
                      {props.errorName}
                    </p>
                  )}
                  <button
                    onClick={props.sendData1}
                    className={`${handles.containerButtonCreateList}`}
                  >
                    Create List
                  </button>
                </div>
              )}
            </div>
          )}
          {props.listTypeWishlist?.length === 0 && (
            <div className={`${handles.containerSelectFlex}`}>
              {props.isButton && (
                <button
                  className={`${handles.containerButtonCreate}`}
                  onClick={props.createLengthZero}
                >
                  Create new list
                </button>
              )}
              {props.isShowForm && (
                <div className={`${handles.containerSelectFlex}`}>
                  <p className={`${handles.containerTitleCreateList}`}>
                    Create a name for the list
                  </p>
                  <input
                    className={`${handles.containerInput}`}
                    type="text"
                    placeholder="List name"
                    name="nameList"
                    value={props.nameListWishlist}
                    onChange={props.handleChange}
                  />
                  {props.errorName && (
                    <p className={`${handles.containerErrorAdd}`}>
                      {props.errorName}
                    </p>
                  )}
                  <button
                    className={`${handles.containerButtonCreateList2}`}
                    onClick={props.sendData2}
                  >
                    Create List
                  </button>
                </div>
              )}
              {props.isMessage && (
                <div className={`${handles.containerMessageAddCreate}`}>
                  You created a new Favourite List and your product was added
                  successfully.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default SelectWishlist
