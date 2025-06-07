import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

type PollData = {
  pollName: string;
  yesCount: number;
  noCount: number;
  yesPercent: number;
  noPercent: number;
  total: number;
  winner: string;
};

type PollProps = {
  initialPoll?: PollData;
};

export default function Poll({ initialPoll }: PollProps) {
  const [poll, setPoll] = useState<PollData>({
    pollName: 'Test Poll',
    yesCount: 0,
    noCount: 0,
    yesPercent: 0,
    noPercent: 0,
    total: 0,
    winner: '',
  });

  // Populate internal state if initialPoll is passed in
  useEffect(() => {
    if (initialPoll) {
      setPoll(initialPoll);
    }
  }, [initialPoll]);

  const pieData = [
    {
      value: poll.noCount,
      color: '#93FCF8',
    },
    {
      value: poll.yesCount,
      color: '#009FFF',
    },
  ];

  const renderDot = (color: string) => (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );

  const renderLegendComponent = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 120,
          marginRight: 20,
        }}>
        {renderDot('#006DFF')}
        <Text style={{ color: 'white' }}>Yes {poll.yesPercent} %</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
        {renderDot('#3BE9DE')}
        <Text style={{ color: 'white' }}>No {poll.noPercent} %</Text>
      </View>
    </View>
  );

  function incrementYes() {
    setPoll(prevPoll => {
      const newYes = prevPoll.yesCount + 1;
      const newTotal = prevPoll.total + 1;
      const newYesPercent = Math.round((newYes / newTotal) * 100);
      const newNoPercent = Math.round((prevPoll.noCount / newTotal) * 100);
      const winner = newYesPercent > newNoPercent ? 'Yes' : 'No';

      return {
        ...prevPoll,
        yesCount: newYes,
        total: newTotal,
        yesPercent: newYesPercent,
        noPercent: newNoPercent,
        winner,
      };
    });
  }

  function incrementNo() {
    setPoll(prevPoll => {
      const newNo = prevPoll.noCount + 1;
      const newTotal = prevPoll.total + 1;
      const newYesPercent = Math.round((prevPoll.yesCount / newTotal) * 100);
      const newNoPercent = Math.round((newNo / newTotal) * 100);
      const winner = newYesPercent > newNoPercent ? 'Yes' : 'No';

      return {
        ...prevPoll,
        noCount: newNo,
        total: newTotal,
        yesPercent: newYesPercent,
        noPercent: newNoPercent,
        winner,
      };
    });
  }

  return (
    <View>
      <Button title="Yes" onPress={incrementYes} />
      <Button title="No" onPress={incrementNo} />
      <Text>Name: {poll.pollName}</Text>
      <Text>Yes: {poll.yesCount}</Text>
      <Text>No: {poll.noCount}</Text>
      <Text>Percent Yes: {poll.yesPercent} %</Text>
      <Text>Percent No: {poll.noPercent} %</Text>
      <Text>Total: {poll.total}</Text>

      <View
        style={{
          margin: 20,
          padding: 16,
          borderRadius: 20,
          backgroundColor: '#232B5D',
        }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          Results
        </Text>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={'#232B5D'}
            centerLabelComponent={() => (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                  {poll.winner}
                </Text>
                <Text style={{ fontSize: 14, color: 'white' }}>
                  {poll.winner === 'Yes' ? poll.yesPercent : poll.noPercent} %
                </Text>
              </View>
            )}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
}
