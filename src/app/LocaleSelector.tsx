import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import React, { ChangeEvent, FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'store';
import { actions } from 'store/actions';
import { pipe } from 'tiinvo';

export interface LocaleSelectorProps {
  
}

const selector = (state: ApplicationState) => state.locale;
const mapchangeeventvalue = (changeevent: ChangeEvent<any>) => changeevent.target.value;

export const LocaleSelector: FC<LocaleSelectorProps> = ({

}) => {
  const state = useSelector(selector);
  const dispatch = useDispatch();
  const setlocale = pipe(actions.locale.set, dispatch);
  const handlechange = pipe(mapchangeeventvalue, setlocale);
  
  return (
    <FormControl>
      <FormLabel>
        <FormattedMessage 
          defaultMessage="Select language"
          id="app.LocaleSelector.label"
        />
      </FormLabel>
      <Select onChange={handlechange} value={state.current}>
        {
          state.locales.map(([value, label], index) =>
            <option value={value} label={label} key={index}>

            </option>
          )
        }
      </Select>
    </FormControl>
  );
}