import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  Platform,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import Unorderedlist from 'react-native-unordered-list';
import Social from '../components/Social'
import {Images, icpaTheme} from '../constants';
import {committeeMembers} from '../_const/const';
import {HeaderHeight} from '../constants/utils';
import {Logo} from '../constants/Images';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
class Home extends React.Component {
  render() {
    return (
      <Block flex center style={styles.home}>
        <Block flex>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}>
            <Block flex style={styles.profileCard}>
              <ScrollView maximumZoomScale = {4} style={{paddingRight: 20}}>
                <Block style={styles.info}>
                  <Block row center>
                    <Image source={Logo} style={{marginTop: 30}} />
                  </Block>
                </Block>
                <Block flex>
                  <Block style={styles.nameInfo}>
                    <Text
                      bold
                      size={20}
                      style={{textAlign: 'center'}}
                      color={icpaTheme.COLORS.DEFAULT}>
                      Constitution of Indian Commercial Pilots' Association
                    </Text>
                  </Block>
                  <Block middle style={{marginTop: 20, marginBottom: 25}}>
                    <Block style={styles.divider} />
                  </Block>

                  <Block style={{alignSelf: 'flex-start'}}>
                    <Text size={15} bold color="#525F7F" style={styles.title}>
                      Name
                    </Text>
                  </Block>
                  <Block>
                    <Block>
                      <Text
                        size={16}
                        color="#525F7F"
                        style={{marginBottom: 10}}>
                        The name of the organisation shall be INDIAN COMMERCIAL
                        PILOTS' ASSOCIATION and it shall hereinafter be referred
                        to in the Constitution as the Association.
                      </Text>
                    </Block>
                  </Block>

                  <Block style={{alignSelf: 'flex-start'}}>
                    <Text size={15} bold color="#525F7F" style={styles.title}>
                      Aims & Objects
                    </Text>
                  </Block>
                  <Block>
                    <Block>
                      <Text
                        size={16}
                        color="#525F7F"
                        style={{marginBottom: 10}}>
                        The aims and objects of the Association shall be
                        follows:
                      </Text>
                      <Unorderedlist>
                        <Text size={16} style={styles.mb10} color="#525F7F">
                          To secure effective organisation and the unity of all
                          Indian Commercial Pilots engaged in India or outside
                          India so as to regulate better their relations and
                          co-operate with their employers.
                        </Text>
                      </Unorderedlist>
                      <Unorderedlist>
                        <Text
                          size={16}
                          color="#525F7F"
                          style={styles.mb10}
                          size={16}
                          color="#525F7F">
                          To watch, defend, secure and promote the rights,
                          interests and privileges of the members, including the
                          standards of employment of pilots and implementation
                          of the system of closed shop for employment.
                        </Text>
                      </Unorderedlist>
                      <Unorderedlist>
                        <Text size={16} color="#525F7F" style={styles.mb10}>
                          To secure speedy and progressive improvement of
                          conditions of work, life and status of the employees
                          in the profession.
                        </Text>
                      </Unorderedlist>
                      <Unorderedlist>
                        <Text size={16} color="#525F7F" style={styles.mb10}>
                          To endeavor to settle disputes between the members and
                          employers amicably.
                        </Text>
                      </Unorderedlist>
                      <Unorderedlist>
                        <Text size={16} color="#525F7F" style={styles.mb10}>
                          To provide legal assistance to members in matters
                          arising out of or incidental to their employment.
                        </Text>
                      </Unorderedlist>
                      <Unorderedlist>
                        <Text size={16} color="#525F7F" style={styles.mb10}>
                          To endeavor to obtain for members various measures of
                          social security including adequate provision against
                          accident, sickness, unemployment, infirmity, old age
                          and death.
                        </Text>
                      </Unorderedlist>
                      <Unorderedlist>
                        <Text size={16} color="#525F7F" style={styles.mb10}>
                          To obtain and disseminate information in reference to
                          the aviation industry and its safe operation amongst
                          the members and to make recommendations to the
                          appropriate authorities from time to time.
                        </Text>
                      </Unorderedlist>
                      <Unorderedlist>
                        <Text size={16} style={styles.mb10} color="#525F7F">
                          To secure due participation of the employees in the
                          control and administration of the industry.
                        </Text>
                      </Unorderedlist>
                      <Unorderedlist>
                        <Text size={16} style={styles.mb10} color="#525F7F">
                          To co-operate with and/or federate with such
                          organizations as may have similar aims and objects and
                          to take such steps as may be necessary to promote the
                          economic and social interests of the members.
                        </Text>
                      </Unorderedlist>
                    </Block>
                  </Block>

                  <Block style={{alignSelf: 'flex-start'}}>
                    <Text size={15} bold color="#525F7F" style={styles.title}>
                      Membership
                    </Text>
                  </Block>
                  <Block>
                    <Unorderedlist>
                      <Text size={16} style={styles.mb10} color="#525F7F">
                        Ordinary member: Any person in India or outside, who is
                        or was employed as a Pilot in an operating Airline
                        agreeing to abide by the rules and bye-laws of the
                        Association that may be made from time to time, shall be
                        entitled to become an ordinary member of the Association
                        on payment of an entrance fee of Rs. 15/- (Rupees
                        Fifteen only) and a monthly subscription of Rs. 10/-. (
                        Rupees 5/-)
                      </Text>
                    </Unorderedlist>
                    <Unorderedlist>
                      <Text
                        size={16}
                        color="#525F7F"
                        style={styles.mb10}
                        size={16}
                        color="#525F7F">
                        Honorary member: Person who are not eligible to become
                        ordinary members of the Association may be admitted as
                        honorary members for the purpose of being elected to the
                        Central Executive by a 3/4ths majority decision of the
                        Central Executive, and they shall be honorary members of
                        the Association for the duration of their office subject
                        to Section 22 of the Indian Trade Unions Act, 1926;
                        their number shall not exceed one.
                      </Text>
                    </Unorderedlist>
                  </Block>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Fine and Forfeitures
                  </Text>
                </Block>
                <Block>
                  <Block>
                    <Text size={16} color="#525F7F" style={{marginBottom: 10}}>
                      A member failing to pay his monthly subscription for three
                      consecutive months shall cease to be a member, but he
                      shall be entitled to membership of the Association on
                      filling in a fresh application form and on payment of his
                      arrears and a fresh entrance fee.
                    </Text>
                  </Block>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Rights of Members
                  </Text>
                </Block>
                <Block>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      A member can exercise his right to vote whenever a
                      decision of the General Body is called for. He is eligible
                      to be elected to any elective post in the Association.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={styles.mb10}
                      size={16}
                      color="#525F7F">
                      Any member of the Association has the right to criticise
                      the policy of the Executive Bodies or the actions of the
                      Executive Members and to make suggestions or proposals for
                      the guidance of Association.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={styles.mb10}
                      size={16}
                      color="#525F7F">
                      Any member or office of the Association may inspect the
                      Register of the members and the books of accounts of the
                      Association which shall be kept in the office of the
                      Association during such hours as may be determined by the
                      Central Executive from time to time.
                    </Text>
                  </Unorderedlist>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Benefits
                  </Text>
                </Block>
                <Block>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      All members shall be eligible for such benefits as the
                      Association shall procure for them and which the
                      Association may decide to give to its members in
                      consonance with the aims and objects of the Association.
                    </Text>
                  </Unorderedlist>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Duties of Members
                  </Text>
                </Block>
                <Block>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      To abide by the constitution and implement all the
                      decisions of the Association.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      To observe the decision of the Association and to assist
                      it to achieve smooth and efficient working.
                    </Text>
                  </Unorderedlist>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Disciplinary Action
                  </Text>
                </Block>
                <Block>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      Any member of the Association found to be working against
                      the interest of the Association may be suspended from the
                      association by a 2/3rds majority vote of the Central
                      Executive or the Regional Committee. He may be expelled
                      from the Association on a motion from either the Central
                      Executive or the Regional Committee by a 2/3rds majority
                      of the General Body or the Regional Body.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      If any officer of the Association is found to be working
                      against the interest of the association or systematically
                      disobeying the decisions of any of the Committees, he may
                      be removed from the committee by a 3/4ths majority vote of
                      the committee provided that in each case the member or the
                      officer concerned shall be given adequate opportunity to
                      defend his conduct before any action is taken against him.
                    </Text>
                  </Unorderedlist>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Vote of No Confidence
                  </Text>
                </Block>
                <Block>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      Regional Committee: Any member or members of the Regional
                      Committee shall be removed from office be a vote of No
                      Confidence adopted by not less than a 3/4ths majority of
                      the respective Regional Body or Regional Committee.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      Central Executive: Any member, or members of the Central
                      Executive, shall be removed from office by a vote of No
                      Confidence adopted by not less than a 3/4ths majority of
                      the Central Executive.
                    </Text>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      No person shall be an Office-Bearer of the Central
                      Executive against whom a vote of no confidence has been
                      passed by the Regional Body that he represents in the
                      Central Executive.
                    </Text>
                  </Unorderedlist>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Register of Members
                  </Text>
                </Block>
                <Block>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      The Central Executive shall maintain a Register of all
                      members containing their names, particulars of their place
                      of work, their residence etc.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      The Regional Committee shall maintain a register of
                      members of the Region concerned in the same manner.
                    </Text>
                  </Unorderedlist>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Register of Members
                  </Text>
                </Block>
                <Block>
                  <Text size={16} color="#525F7F" style={{marginBottom: 10}}>
                    The Association will have: -
                  </Text>
                  <Text size={16} color="#525F7F" style={{marginBottom: 10}}>
                    (a) Regional Body (c) General Body
                  </Text>
                  <Text size={16} color="#525F7F" style={{marginBottom: 10}}>
                    (b) Regional Committee (d) Central Executive
                  </Text>
                  <Text size={16} color="#525F7F" style={{marginBottom: 10}}>
                    b & d shall be elected annually.
                  </Text>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Regional Body
                  </Text>
                </Block>
                <Block>
                  <Text size={16} color="#525F7F" style={{marginBottom: 10}}>
                    Each of the Association's Regions with its members on rolls
                    will constitute the Regional Body who shall elect the
                    Regional Committee annually. This body will be supreme so
                    far as the Region goes and the Regional Committee shall be
                    responsible to it.
                  </Text>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Duties and Responsibilities of the Office-Bearers of the
                    Regional Committee :
                  </Text>
                </Block>
                <Block>
                  <Unorderedlist>
                    <Text size={16} color="#525F7F" style={{marginBottom: 10}}>
                      Regional President: He shall generally supervise the work
                      of the Association in the Region and shall preside over
                      all the meetings in the Region and shall sign all minutes,
                      preserve order at meeting and shall have a casting vote in
                      case of a tie.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      Secretary: He shall maintain a Membership Register,
                      maintain minutes of all meetings in the Region, conduct
                      all correspondence, maintain all records and convene all
                      meetings. He shall submit to the Central Executive
                      quarterly reports on the following month :
                    </Text>
                    <Unorderedlist>
                      <Text
                        size={16}
                        color="#525F7F"
                        style={{marginBottom: 10}}>
                        Membership as on the 1st and last dates of the quarter.
                      </Text>
                    </Unorderedlist>
                    <Unorderedlist>
                      <Text
                        size={16}
                        color="#525F7F"
                        style={{marginBottom: 10}}>
                        Number of members who have ceased to be members during
                        the quarter with reasons thereof.
                      </Text>
                    </Unorderedlist>
                    <Unorderedlist>
                      <Text
                        size={16}
                        color="#525F7F"
                        style={{marginBottom: 10}}>
                        Brief summary of the matter dealt within the Region and
                        the results thereof.
                      </Text>
                    </Unorderedlist>
                    <Unorderedlist>
                      <Text
                        size={16}
                        color="#525F7F"
                        style={{marginBottom: 10}}>
                        A statement of receipts and expenditure during the
                        month, together with monthly bank statements. He shall
                        submit to the Central Executive all books of accounts as
                        soon as possible after the closing year of the
                        Association for the purpose of audit and such other
                        documents as may be required.
                      </Text>
                    </Unorderedlist>
                    <Unorderedlist>
                      <Text
                        size={16}
                        color="#525F7F"
                        style={{marginBottom: 10}}>
                        He shall have powers to sanction the amount not
                        exceeding Rs. 150/- per month in case of emergency,
                        subject to subsequent ratification by the Regional
                        Committee.
                      </Text>
                    </Unorderedlist>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      Asst. Secretary: Shall assist the Secretary in all his
                      duties.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      Treasurer: The Regional Treasurer shall be responsible for
                      all sums of money, which may from time to time be paid to
                      the Region. He shall make all payments towards all
                      expenditure sanctioned by the Regional Committee and
                      confirmed by the Secretary. He shall keep all accounts and
                      help the Secretary in submitting the quarterly returns
                      etc.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      An ordinary meeting of the Regional Committee may be
                      called on 3 clear days' notice and an emergency meeting on
                      24 hours' notice.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      All vacancies caused by death, expulsion or resignation of
                      members of the Regional Committee may be filled by
                      co-option provided that at no time the Regional Committee
                      shall have more than one of its members who is not
                      directly elected by the Regional Body.
                    </Text>
                  </Unorderedlist>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    General Body
                  </Text>
                </Block>
                <Block>
                  <Text size={16} style={styles.mb10} color="#525F7F">
                    The General Body shall be the supreme body of the
                    Association and shall comprise all the members of the
                    Association at all Regions.
                  </Text>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Central Executive
                  </Text>
                </Block>
                <Block>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      The Central Executive shall have :
                    </Text>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      (a) One President. (c) One Treasurer.
                    </Text>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      (b) One Vice-President (d) One Asst. Secretary
                    </Text>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      (e) One General Secretary (f) Not more than four other
                      members of the Executive.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      The Central Executive shall manage the affairs of the
                      Association, financial and otherwise, and shall have all
                      the powers of the General Body.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      The Central Executive shall meet (once a year and as often
                      as is necessary) once at least once every four months.
                      Fourteen days' prior notice shall be given for an Ordinary
                      meeting of the Central Executive. In the case of an
                      Emergency 4 clear days' notice shall be given with the
                      object of the meeting specified.The Central Executive
                      shall meet (once a year and as often as is necessary) once
                      at least once every four months. Fourteen days' prior
                      notice shall be given for an Ordinary meeting of the
                      Central Executive. In the case of an Emergency 4 clear
                      days' notice shall be given with the object of the meeting
                      specified.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      A special meeting of the Central Executive shall be
                      convened by the General Secretary or the President on a
                      request from not less than 1/3rd of the members of the
                      Central Executive, specifying the objects of the meeting.
                      If the General Secretary or the President fails to call
                      the meeting within 3 days of the receipt of such a
                      requisition, any one of the requisitions may convene the
                      meeting of the Central Executive and the decisions of such
                      a meeting shall be the decision of the Central Executive.
                      Seven clear days' notice shall be given for a special
                      meeting of the Central Executive.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      All vacancies caused by death, expulsion or resignation of
                      members of the Central Executive may be filled by the
                      Central Executive by co-option provided that at no time
                      the Central Executive shall have more than two of its
                      members who are not duly elected.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      The Central Executive shall have all powers to take all
                      necessary steps to carry out policies and decisions which
                      it may decide upon and have the power to make rules and/or
                      bye-laws, as may be necessary from time to time for the
                      proper administration of the Association, provided that no
                      such rules or bye-laws are inconsistent with the
                      constitution of the Association.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      Any member of the Central Executive failing to attend two
                      consecutive meetings of the Central Executive without
                      prior notice and adequate reasons shall cease to be as
                      such.
                    </Text>
                  </Unorderedlist>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Annual General Meeting of the Central Executive:
                  </Text>
                </Block>
                <Block>
                  <Text size={16} style={styles.mb10} color="#525F7F">
                    An Annual General Meeting of the Central Executive shall
                    meet within 3 months after the end of the official year to
                    transact the following business:
                  </Text>

                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      To consider and adopt the Annual Report of the
                      Association.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      To consider and adopt the Annual Statement of Account of
                      the Association.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      To set up an election committee or machinery to conduct
                      the election of the Central Executive for the forthcoming
                      year.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      To transact any other business referred to it or with the
                      permission of the Chair when the meeting is in session.
                    </Text>
                  </Unorderedlist>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Duties of Office-Bearers of the Central Executive
                  </Text>
                </Block>
                <Block>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      <Text bold>President:</Text> The President shall preside
                      over all meetings of the Association and its committees,
                      preserve order, sign all minutes and shall have a casting
                      vote in case of a tie. The President shall generally
                      supervise the work of the Association and its committees
                      at all levels.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      <Text bold>Vice-President:</Text> The Vice-President shall
                      function as the President in the absence of the President
                      and in such cases he shall have a casting vote also in
                      case of a tie.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      <Text bold>General Secretary:</Text> The General Secretary
                      shall maintain the Resister of members, minutes of all
                      meetings of the Central Executive, conduct all
                      correspondence, convene all meetings, maintain all records
                      and shall be responsible for submitting to the Registrar
                      of Trade Unions all returns and notices that should be
                      sent to the Officer under the Indian Trade Unions Act.
                      1926.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      <Text bold>Assistant Secretary:</Text> The duties of the
                      Asst. Secretary shall be to assist the General Secretary
                      and to carry out such duties as the Central Executive may
                      prescribe from time to time.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text style={styles.mb10} color="#525F7F">
                      <Text bold>Treasurer:</Text> The Treasurer shall be
                      responsible for all sums of money that may be paid from
                      time to time to the Association. He shall make all
                      payments sanctioned by the Central Executive and confirmed
                      by the General Secretary. He shall keep all accounts off
                      the Association and prepare the annual balance sheet of
                      receipt and expenditure.
                    </Text>
                  </Unorderedlist>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Quorum
                  </Text>
                </Block>
                <Block>
                  <Text size={16} style={styles.mb10} color="#525F7F">
                    The Quorum for all meetings shall be one third of the total
                    number of members of the body concerned, either by person
                    and/or by proxy, unless otherwise specified; for an
                    adjourned meeting no quorum is required.
                  </Text>
                  <Text size={16} style={styles.mb10} color="#525F7F">
                    The quorum for the Central Executive shall be 2/3rds of the
                    total number of members.
                  </Text>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Voting
                  </Text>
                </Block>
                <Block>
                  <Text size={16} style={styles.mb10} color="#525F7F">
                    All decisions shall be taken by a simple majority vote,
                    except where a different requirement is specifically
                    prescribed. Voting in all meetings shall be by a show of
                    hands, but any other method of division shall be granted
                    when demanded by any member.
                  </Text>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Election
                  </Text>
                </Block>
                <Block>
                  <Text size={16} style={styles.mb10} color="#525F7F">
                    Regional Committee: From amongst the members of the Regional
                    Body, the Regional Committee shall be elected by ballot
                    where there is a contest.
                  </Text>
                  <Text size={16} style={styles.mb10} color="#525F7F">
                    Central Executive: From amongst the elected members of the
                    Regional Committee, the Regional Body shall elect two or
                    more members as per allocation to the Central Executive each
                    year.(From amongst the elected members of the Regional
                    Committee, the Regional Body shall elect the Central
                    Executive representatives as per allocation to the Regional
                    amongst whom the Region Secretary will be a de-facto
                    representative.)
                  </Text>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Funds
                  </Text>
                </Block>
                <Block>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      <Text bold>Central Funds:</Text> The Central Funds of the
                      Association shall consist of 50% of the monthly
                      subscriptions and shall be deposited by the Treasurer in a
                      scheduled bank or scheduled bank approved by the Central
                      Executive. The Account should be operated by the Treasurer
                      and any one member of the Central Executive. at all
                      levels.
                    </Text>
                    <Text
                      size={16}
                      style={[styles.mb10, {textDecorationLine: 'underline'}]}
                      color="#525F7F">
                      (The Central Funds of the Association shall consist of 50%
                      of the monthly subscriptions" instead of 25% of the
                      monthly subscription.)
                    </Text>
                    <Text
                      size={16}
                      style={[styles.mb10, {textDecorationLine: 'underline'}]}
                      color="#525F7F">
                      (The accounts should be operated by the Treasurer and
                      either the President or the General Secretary.)
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      <Text bold>Regional Funds. :</Text> The Region shall
                      retain the remaining portion of the subscription collected
                      in the Region to meet Regional expenses, after paying to
                      the Central Fund. The Regional Committee shall open an
                      account in the name of the Association in a scheduled bank
                      approved by the Regional Committee and shall be operated
                      by the Regional Treasurer and either the Regional
                      President or the Secretary.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      <Text bold>Extraordinary Funds:</Text> Either the Central
                      Executive or the Regional Committee can, when occasion
                      demands, decided to raise special funds.
                    </Text>
                  </Unorderedlist>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Objects on which the Association Funds may be expended :
                  </Text>
                </Block>
                <Block>
                  <Text size={16} style={styles.mb10} color="#525F7F">
                    The general funds of the Association shall not be spent on
                    any other objects than the following, namely:
                  </Text>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      The payment of salaries allowances and expense to officers
                      of the Association.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      The payment of expenses for the administration of the
                      Association, including audit of the accounts of general
                      funds of the Association.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      The prosecution or defence of any legal proceedings to
                      which the Association or any member thereof is a party,
                      when such prosecution or defence is undertaken for the
                      purpose of securing or protecting any rights arising out
                      of the relations of any member with his employer or with a
                      person whom the member employs.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      The conduct of trade disputes on behalf of the Association
                      or any member thereof.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      The compensation to members for loss arising out of trade
                      disputes.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      Allowances to members or their dependents on account of
                      death, old age, sickness, accidents or unemployment of
                      such members.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      The issue of, or the undertaking of, liability under
                      policies of assurance on the lives of members, or under
                      policies insuring members against sickness, accident or
                      unemployment.
                    </Text>
                  </Unorderedlist>

                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      The provision of educational or social benefits for
                      members and their dependents.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      Upkeep of a periodical published in conjunction with the
                      aims and objects of the association.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      The payment in furtherance of any of the subjects on which
                      the funds of the Association may be spent by contributing
                      to any cause intended to benefit the Association or other
                      Trade Union organisation with similar aims and objects,
                      provided that the expenditure in this regard shall not at
                      any time during that year be in excess of 1/4th of the
                      combined total of the gross income which has accrued to
                      the General Funds of the Association during that year.
                    </Text>
                  </Unorderedlist>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Audit
                  </Text>
                </Block>
                <Block>
                  <Text size={16} style={styles.mb10} color="#525F7F">
                    The Accounts of the Association shall be audited every year
                    by competent auditors in accordance with the provision of
                    the Indian Trade Unions Act, 1926, and regulations framed
                    thereunder. The financial year of the Association shall be
                    from 1st April to 31st March next.
                  </Text>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Strike
                  </Text>
                </Block>
                <Block>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F"></Text>
                    <Unorderedlist>
                      <Text size={16} style={styles.mb10} color="#525F7F">
                        A strike shall be declared only after giving 14 days'
                        notice to the employer/employers. Before such notice is
                        served, the decision to strike shall be taken by a
                        secret ballot called for the purpose , provided 2/3rds
                        of the members of the respective Regions vote for the
                        decision to strike.
                      </Text>
                    </Unorderedlist>
                    <Unorderedlist>
                      <Text size={16} style={styles.mb10} color="#525F7F">
                        Provided also the Central Executive may in an emergency
                        decide and declare a strike if 3/4ths of the members of
                        the Central Executive vote in favour.
                      </Text>
                    </Unorderedlist>
                    <Unorderedlist>
                      <Text size={16} style={styles.mb10} color="#525F7F">
                        Provided also the Regional Committee may in an emergency
                        decide and declare a strike for the Region if 3/4 of the
                        Regional Members vote in favour with intimation to the
                        Central Executive.
                      </Text>
                    </Unorderedlist>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      <Text bold>Strike Committee :</Text> If a strike is
                      decided upon, a strike committee may be form to conduct
                      the strike and the said committee shall be responsible for
                      taking all necessary steps for the proper conduct of the
                      strike. The management of the Association, thenceforward,
                      shall be in the hands of the strike committee, during the
                      duration of the strike.
                    </Text>
                  </Unorderedlist>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Affiliation
                  </Text>
                </Block>
                <Block>
                  <Text size={16} style={styles.mb10} color="#525F7F">
                    The Association shall not affiliate or federate with any
                    organisation of labour without a special resolution adopted
                    by the Central Executive and duly authorised and endorsed
                    earlier by the Regional Committees.
                  </Text>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Amendment to the Constitution :
                  </Text>
                </Block>
                <Block>
                  <Text size={16} style={styles.mb10} color="#525F7F">
                    The rule of the Association may be altered, modified or
                    amended at a special meeting, normally the Annual Meeting of
                    the Executives after giving notice of the proposed amendment
                    to all the Regions and provided 14 days' clear notice is
                    given before the Central Executive meets for this purpose.
                  </Text>
                </Block>
                <Block style={{alignSelf: 'flex-start'}}>
                  <Text size={15} bold color="#525F7F" style={styles.title}>
                    Dissolution
                  </Text>
                </Block>
                <Block>
                  <Text size={16} style={styles.mb10} color="#525F7F">
                    The Association may be dissolved by a 3/4ths majority of
                    members present in person or by proxy, provided that the
                    total number of votes cast at the meeting is not less than
                    3/4ths of the total number of members on the rolls of the
                    Association. The meeting shall decide as to the disposal or
                    distribution of the assets of the Association among the
                    members, or otherwise in accordance with the provisions of
                    the Indian Trade Unions Act, 1926.
                  </Text>
                </Block>
                <Block style={styles.ammendment}>
                  {/* <Text size={22} bold color="#525F7F" center style={{marginBottom: 20}}>
                    The Amendment in the Constitution made in 1958
                  </Text>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      Page 2, Section 3, Sub-section (a), Last line insert
                      "Rs.10/-" instead of "Rs. 5/-".
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      Page 5, Section 13, Sub-section (d), should be changed to
                      read as "The Regional Committee shall meet as often as
                      necessary, not less than four times a year."
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      Page 6, Section 16, Sub-section © “The Central Executive
                      shall meet at least once every four months" to be changed
                      to read as "The Central Executive shall meet once a year
                      and as often as is necessary.
                    </Text>
                  </Unorderedlist>

                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      Page 8, Section 21, Sub-section (b) “Instead of from
                      amongst the elected members of the Regional Committee, the
                      Regional Body shall elect two or more members as per the
                      allocation to the Central Executive each year." Insert
                      "from amongst the elected members of the Regional
                      Committee, the Regional Body shall elect the Central
                      Executive representatives as per allocation to the Region
                      amongst whom the Region Secretary will be a de-fact to
                      representative."
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      Page 9, Section 22, Sub-section (a), insert “The Central
                      Funds of the Association shall consist of 50% of the
                      monthly subscriptions" instead of 25% of the monthly
                      subscriptions.
                    </Text>
                  </Unorderedlist>
                  <Unorderedlist>
                    <Text size={16} style={styles.mb10} color="#525F7F">
                      Page 9, Section 22, Sub-section (a) last sentence "The
                      accounts should be operated by the Treasurer and anyone
                      member of the Central Executive" to be replaced by "The
                      accounts should be operated by the Treasurer and either
                      President or the General Secretary.
                    </Text>
                  </Unorderedlist>
                  <Text size={18} bold style={styles.mb10} color="#525F7F">
                    ON SEPTEMBER 15, 1958 :
                  </Text>
                  <Text size={16} style={styles.mb10} color="#525F7F">
                    Insert the following after the line reading "shall cease to
                    be a member" under Fines & Forfeitures:
                  </Text>
                  <Text size={16} style={styles.mb10} color="#525F7F">
                    "but he may be re-enrolled on his assigning to the Regional
                    Committee reason which they in their sole discretion may
                    consider satisfactory for his having failed to pay such
                    subscriptions falling due in the interval or which would
                    have so falled due had he continued to be a member. No
                    member who is a defaulter shall be entitled during the
                    period of default to exercise any of the rights and
                    privileges of membership."
                  </Text> */}
                  <Text size={14} style={{marginTop:20,textAlign: 'right'}} right color="#525F7F">
                  Sd/- S.S.Rao
                  </Text>
                  <Text size={14} style={{textAlign: 'right'}} right color="#525F7F">
                  Central President
                  </Text>
                  <Text size={14} style={{textAlign: 'right',marginBottom: 10}} right  color="#525F7F">
                  24/09/1962
                  </Text>
                </Block>
              </ScrollView>
            </Block>
          </ImageBackground>
        </Block>
        <Social/>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    flex: 1,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2,
  },
  profileCard: {
    padding: theme.SIZES.BASE,
    paddingRight: 0,
    paddingBottom: 160,
    marginHorizontal: 10,
    marginTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  info: {
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  divider: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  title: {
    marginBottom: 10,
    color: icpaTheme.COLORS.BLACK,
    fontSize: 15,
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    flexDirection: 'column',
    borderWidth: 0,
    minHeight: 80,
    padding: 10,
    position: 'relative',
    margin: 10,
    marginBottom: 5,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 100,
    width: 100,
  },
  mb10: {
    marginBottom: 10,
  },
  ammendment:{
    padding:15,
    // borderWidth:1,
    // borderColor:icpaTheme.COLORS.BORDER,
  }
});

export default Home;
