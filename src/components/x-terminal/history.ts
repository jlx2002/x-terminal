/*
 * @Description: 终端history历史
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-17 16:50:12
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-17 22:24:38
 */
import { Ref, ref } from "vue";
import CommandOutputType = Terminal.CommandOutputType;
import CommandInputType = Terminal.CommandInputType;

/**
 * 查看历史功能
 * @param commandList
 * @param inputCommand
 */
const useHistory = (
  commandList: CommandOutputType[],
  inputCommand: Ref<CommandInputType>
) => {
  /**
   * 当前查看的命令位置
   */
  const commandHistoryPos = ref(commandList.length);

  const listCommandHistory = () => {
    return commandList;
  };

  const showNextCommand = () => {
    console.log(commandHistoryPos.value, commandList, inputCommand);
    if (commandHistoryPos.value < commandList.length - 1) {
      commandHistoryPos.value++;
      inputCommand.value.text = commandList[commandHistoryPos.value].text;
    } else if (commandHistoryPos.value === commandList.length - 1) {
      commandHistoryPos.value++;
      inputCommand.value.text = "";
    }
  };

  const showPrevCommand = () => {
    console.log(commandHistoryPos.value, commandList, inputCommand);
    if (commandHistoryPos.value >= 1) {
      commandHistoryPos.value--;
      inputCommand.value.text = commandList[commandHistoryPos.value].text;
    }
  };

  return {
    commandHistoryPos,
    listCommandHistory,
    showNextCommand,
    showPrevCommand,
  };
};

export default useHistory;
