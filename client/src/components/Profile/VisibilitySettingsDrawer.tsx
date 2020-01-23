import * as React from 'react';
import { toPairs, mapValues, values } from 'lodash';
import { ConfigurableProfilePermissions } from '../../../../common/models/profile';
import {
  Drawer,
  Checkbox,
  List,
  Typography,
} from 'antd';

const { Text } = Typography;

type Props = {
  isSettingsVisible: boolean;
  hideSettings: () => void;
  permissionsSettings?: Partial<ConfigurableProfilePermissions>;
};

enum permissionNames {
  isProfileVisible = 'Who can see my profile?',
  isAboutVisible = 'About',
  isEducationVisible = 'Education info',
  isEnglishVisible = 'English level',
  isEmailVisible = 'Email',
  isTelegramVisible = 'Telegram',
  isSkypeVisible = 'Skype',
  isPhoneVisible = 'Phone',
  isContactsNotesVisible = 'Contact notes',
  isLinkedInVisible = 'Link to LinkedIn profile',
  isPublicFeedbackVisible = 'Public feedback',
  isMentorStatsVisible = 'Mentor statistics',
  isStudentStatsVisible = 'Student statistics',
}

enum roles {
  all = 'Everybody',
  mentor = 'Mentor assigned (who can check your tasks / interview)',
  student = 'Student assigned to you',
}

class VisibilitySettingsDrawer extends React.Component<Props> {
  render() {
    const { isSettingsVisible, hideSettings, permissionsSettings } = this.props;
    return (
      <Drawer
        title="Visibility settings"
        placement="top"
        closable={true}
        onClose={hideSettings}
        visible={isSettingsVisible}
        getContainer={false}
        style={{ position: 'absolute', display: isSettingsVisible ? 'block' : 'none' }}
      >
        <List
          itemLayout="horizontal"
          dataSource={toPairs(permissionsSettings)}
          renderItem={(
            [permissionName, actualPermissions],
          ) => (
            <List.Item>
              <div>
                <p style={{ fontSize: 18, marginBottom: 5 }}><Text strong>{permissionNames[permissionName]}</Text></p>
                {values(
                  mapValues(actualPermissions, (isChecked, role) => (
                    <p key={`visibility-settings-${permissionName}-${role}`} style={{ marginBottom: 0 }}>
                      <Checkbox defaultChecked={isChecked} style={{ fontSize: 12 }}>
                        {roles[role]}
                      </Checkbox>
                    </p>
                  )),
                )}
              </div>
            </List.Item>
          )}
        />
      </Drawer>
    );
  }
}

export default VisibilitySettingsDrawer;