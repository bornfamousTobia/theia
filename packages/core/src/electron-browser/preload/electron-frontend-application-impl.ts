// *****************************************************************************
// Copyright (C) 2023 Ericsson and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
// *****************************************************************************

import { inject, injectable } from 'inversify';
import { FrontendApplicationState, StopReason } from '../../common/frontend-application-state';
import { ElectronFrontendApplication, ELECTRON_FRONTEND_APPLICATION_IPC as ipc, proxy, proxyable, TheiaIpcRenderer } from '../../electron-common';

@injectable() @proxyable()
export class ElectronFrontendApplicationImpl implements ElectronFrontendApplication {

    @inject(TheiaIpcRenderer)
    protected ipcRenderer: TheiaIpcRenderer;

    @proxy() handleCanClose(handler: (reason: StopReason) => Promise<boolean>): void {
        this.ipcRenderer.handle(ipc.canClose, (event, reason) => handler(reason));
    }

    @proxy() updateApplicationState(state: FrontendApplicationState): void {
        this.ipcRenderer.send(ipc.updateApplicationState, state);
    }

    @proxy() restart(): void {
        this.ipcRenderer.send(ipc.restart);
    }
}
