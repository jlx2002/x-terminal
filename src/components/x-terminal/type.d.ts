/*
 * @Description: 请填写文件简介
 * @Version: 0.0
 * @Autor: jlx
 * @Date: 2022-09-07 22:36:43
 * @LastEditors: jlx
 * @LastEditTime: 2022-09-09 16:40:37
 */

declare namespace Terminal {

    /**
      * 输出状态
      */
    type OutputStatusType = "info" | "success" | "warning" | "error" | "system";

    /**
     * 输出类型
     */
    interface OutputType {
        type: "command" | "text" | "component";
        text?: string;
        resultList?: OutputType[];
        component?: any;
        status?: OutputStatusType;
        props?: any;
        collapsible?: boolean;
    }

    /**
     * 命令类型输出
     */
    interface CommandOutputType extends OutputType {
        type: "command";
        text: string;
        resultList: OutputType[];
    }

    /**
     * 文本类型输出
     */
    interface TextOutputType extends OutputType {
        type: "text";
        text: string;
    }

    /**
     * 组件类型输出
     */
    interface ComponentOutputType extends OutputType {
        type: "component";
        component: any;
        props?: any;
    }

    /**
     * 命令输入类型
     */
    interface CommandInputType {
        text: string;
        placeholder?: string;
    }

    /**
     * 终端类型（定义一组访问及操作终端的方法）
     */
    interface TerminalType {
        // 清屏
        clear: () => void;
        // 立即输出
        writeOutput: (output: OutputType) => void;
        // 立即输出文本
        writeTextOutput: (text: string, status?: OutputStatusType) => void;
        // 写命令文本结果
        writeTextResult: (text: string, status?: OutputStatusType) => void;
        // 写命令错误文本结果
        writeTextErrorResult: (text: string) => void;
        // 写命令成功文本结果
        writeTextSuccessResult: (text: string) => void;
        // 写命令结果
        writeResult: (output: OutputType) => void;
        // 提交命令
        doSubmitCommand: () => void;
        // 设置命令是否可折叠
        setCommandCollapsible: (collapsible: boolean) => void;
    }
}