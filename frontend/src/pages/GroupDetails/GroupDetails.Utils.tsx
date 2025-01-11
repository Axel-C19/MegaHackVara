export const getTotalOwedFromGroup = (
  group: any,
  wallet: string
): [number, number] => {
  if (!group || !wallet) {
    return [0, 0];
  }
  let totalMembers = group.members.length;

  let totalOwed = 0;
  let totalOwe = 0;

  group.expenses.forEach((expense: any) => {
    if (expense.actor_id === wallet) {
      totalOwed += (expense.amount / totalMembers) * (totalMembers - 1);
    } else {
      totalOwe += expense.amount / totalMembers;
    }
  });

  group.payments.forEach((payment: any) => {
    if (payment.from === wallet) {
      totalOwe -= payment.amount;
    } else if (payment.to === wallet) {
      totalOwed -= payment.amount;
    }
  });

  return [totalOwed, totalOwe];
};

export const getTotalOwedFromGroupToEachUser = (group: any, wallet: string) => {
  if (!group || !wallet) {
    return [];
  }

  let owedToEachUser: { [key: string]: number } = {};
  const totalMembers = group.members.length;

  group.expenses.forEach((expense: any) => {
    const amountPerMember = expense.amount / totalMembers;

    if (expense.actor_id === wallet) {
      // This wallet paid the expense, so others owe this wallet
      group.members.forEach((member: string) => {
        if (member !== wallet) {
          owedToEachUser[member] =
            (owedToEachUser[member] || 0) + amountPerMember;
        }
      });
    } else {
      // This wallet owes to the actor who paid
      owedToEachUser[expense.actor_id] =
        (owedToEachUser[expense.actor_id] || 0) - amountPerMember;
    }
  });

  console.log(owedToEachUser);

  //   group.payments.forEach((payment: any) => {
  //     if (payment.from === wallet) {
  //       owedToEachUser[payment.to] =
  //         (owedToEachUser[payment.to] || 0) - payment.amount;
  //     } else if (payment.to === wallet) {
  //       owedToEachUser[payment.from] =
  //         (owedToEachUser[payment.from] || 0) + payment.amount;
  //     }
  //   });

  return owedToEachUser;
};
